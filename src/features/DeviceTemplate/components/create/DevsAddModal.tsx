import {
  Button,
  Divider,
  Group,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { DeviceFloppy, X } from "tabler-icons-react";
import { SelectOptions } from "../../../../types/common";
import {
  deviceTemplateDevsCreateModalState,
  deviceTemplateDevsCreateState,
} from "../../utils/store";

export default function DevsAddModal(props: {
  unitOptions: SelectOptions[];
  saveHandler: any;
}) {
  const { unitOptions, saveHandler } = props;
  const showModal = useRecoilValue(deviceTemplateDevsCreateModalState);
  const resetModal = useResetRecoilState(deviceTemplateDevsCreateModalState);
  const setDevices = useSetRecoilState(deviceTemplateDevsCreateState);
  const [sn, setSn] = useState("");
  const [isSpare, setIsSpare] = useState<string | null>("1");
  const [unitId, setUnitId] = useState<string | null>("");

  const resetForm = () => {
    setSn("");
    setIsSpare("1");
    setUnitId("");
    resetModal();
  };
  const saveButtonHandler = () => {
    saveHandler({ sn, unitId, isSpare });
    resetForm();
  };

  return (
    <Modal
      opened={showModal}
      onClose={resetForm}
      size="lg"
      radius={"lg"}
      title="Add Devices to Device Template"
    >
      <TextInput
        label="Serial Number"
        description="Input device serial number to identify with other device"
        my="md"
        value={sn || ""}
        onChange={(e) => {
          setSn(e.target.value);
        }}
      />
      <Select
        data={[
          { label: "Yes, this device is a Spare", value: "1" },
          { label: "No.", value: "0" },
        ]}
        placeholder="Select Options"
        label="Device Is Spare? :"
        sx={{ width: 300 }}
        radius="md"
        my="md"
        value={isSpare}
        onChange={(v) => {
          setIsSpare(v);
        }}
      />
      <Select
        data={unitOptions}
        placeholder="Select Options"
        label="Unit"
        sx={{ width: 300 }}
        radius="md"
        my="md"
        value={unitId}
        onChange={(v) => {
          setUnitId(v);
        }}
      />
      <Divider variant="dotted" my="md" />
      <Group position="apart">
        <Button
          radius={"md"}
          variant="subtle"
          color={"orange"}
          leftIcon={<X />}
          onClick={resetModal}
        >
          Discard
        </Button>
        <Button
          radius={"md"}
          rightIcon={<DeviceFloppy />}
          type="submit"
          onClick={saveButtonHandler}
        >
          Save
        </Button>
      </Group>
    </Modal>
  );
}
