import {
  Button,
  Divider,
  Grid,
  Group,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { DeviceFloppy, X } from "tabler-icons-react";
import { SelectOptions } from "../../../../types/common";
import { updateDevice } from "../../../Devices/utils/service";
import {
  deviceTemplateQuickUpdateDeviceState,
  deviceTemplateQuickUpdateTriggreState,
} from "../../utils/store";

export default function QuickUpdateDeviceTemplate(props: {
  unitOptions: SelectOptions[];
}) {
  const { unitOptions } = props;
  const data = useRecoilValue(deviceTemplateQuickUpdateDeviceState);
  const resetModal = useResetRecoilState(deviceTemplateQuickUpdateDeviceState);
  const setTrigger = useSetRecoilState(deviceTemplateQuickUpdateTriggreState);
  const [sn, setSn] = useState("");
  const [unitId, setUnitId] = useState<string>();
  const [spare, setSpare] = useState<string | null>(null);
  const [ipAddress, setIpAddress] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSn(data.data.serialNumber || "");
    setUnitId(data.data.unit?.id!.toString());
    setSpare(isSpare);
    setIpAddress(data.data.ipAddress);
  }, [data.data.id]);

  const isSpare = () => (data.data.isSpare ? "1" : "0");
  const isSpareSelectHandler = (vals: string) => {
    setSpare(vals);
  };
  const unitSelectHandler = (vals: string) => {
    setUnitId(vals);
  };
  const submitHandler = () => {
    setLoading(true);
    updateDevice({
      id: data.data.id,
      isSpare: spare === "1",
      ipAddress,
      serialNumber: sn,
      unitId,
    })
      .then(() => {
        showNotification({
          title: "Update Device",
          message: "Device Quick Update Success!",
          color: "green",
        });
        setTrigger((t) => !t);
        resetModal();
      })
      .catch((e) => {
        showNotification({
          title: "Update Device",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      opened={data.showModal}
      onClose={resetModal}
      title="Quick Update Device"
      radius={"lg"}
      size="lg"
    >
      <TextInput
        label="Serial Number"
        description="Serial Number of this Device"
        my="md"
        value={sn}
        onChange={(vals) => {
          setSn(vals.target.value);
        }}
      />
      <Grid>
        <Grid.Col sm={12} md={5}>
          <Select
            data={[
              { label: "Yes, this device is Spare", value: "1" },
              { label: "No.", value: "0" },
            ]}
            placeholder="Select Options"
            label="Device Is Spare? :"
            radius="md"
            description="Set if this device is spare/backup"
            variant="filled"
            onChange={isSpareSelectHandler}
            value={spare}
          />
        </Grid.Col>
        {spare === "0" && (
          <Grid.Col sm={12} md={7}>
            <TextInput
              label="IP Address"
              description="IP Address setted on this device (if available)"
              value={ipAddress || ""}
              onChange={(vals) => {
                setIpAddress(vals.target.value);
              }}
            />
          </Grid.Col>
        )}
      </Grid>
      <Select
        data={unitOptions || []}
        placeholder="Select Options"
        label="Unit :"
        radius="md"
        variant="filled"
        onChange={unitSelectHandler}
        value={unitId}
        my={"md"}
      />
      <Divider variant="dotted" my={"lg"} />
      <Group position="apart">
        <Button
          radius={"md"}
          variant="subtle"
          color={"orange"}
          leftIcon={<X />}
          onClick={resetModal}
          loading={loading}
        >
          Discard
        </Button>
        <Button
          radius={"md"}
          rightIcon={<DeviceFloppy />}
          onClick={submitHandler}
          loading={loading}
        >
          Save
        </Button>
      </Group>
    </Modal>
  );
}
