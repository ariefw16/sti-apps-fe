import {
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ArrowLeft, DeviceFloppy } from "tabler-icons-react";
import { SelectOptions } from "../../../../types/common";
import { updateDeviceTemplate } from "../../utils/service";
import {
  deviceTemplateDetailState,
  deviceTemplateQuickUpdateTriggreState,
} from "../../utils/store";

export default function DeviceTemplateGeneralInfoEdit(props: {
  typeOptions: SelectOptions[];
}) {
  const { typeOptions } = props;
  const navigate = useNavigate();
  const template = useRecoilValue(deviceTemplateDetailState);
  const setTrigger = useSetRecoilState(deviceTemplateQuickUpdateTriggreState);
  const [name, setName] = useState("");
  const [merk, setMerk] = useState("");
  const [deviceTypeId, setDeviceTypeId] = useState<string | null>(null);

  useEffect(() => {
    setName(template.name ?? "");
    setMerk(template.merk ?? "");
    setDeviceTypeId(template.deviceType?.id?.toString() ?? null);
  }, [template]);

  const typeChangeHandler = (vals: string) => {
    setDeviceTypeId(vals);
  };
  const backButtonHandler = () => {
    navigate(-1);
  };
  const saveButtonHandler = () => {
    updateDeviceTemplate({
      id: template.id!,
      data: {
        merk,
        name,
      },
    })
      .then(() => {
        setTrigger((t) => !t);
        navigate(`/device-template/${template.id}`);
        showNotification({
          title: "Update Device Template",
          message: "Update Template Success!",
          color: "green",
        });
      })
      .catch((e) => {
        showNotification({
          title: "Update Device Template",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

  return (
    <Grid>
      <Grid.Col sm={12} lg={8}>
        <Paper p={20} radius="lg" mt={20}>
          <Title order={5}>General Information</Title>
          <Divider my={"md"} variant="dotted" />
          <TextInput
            my={"sm"}
            label="Name"
            description="Device Template Name, applied to all device"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextInput
            my={"sm"}
            label="Merk"
            description="Device Brand"
            value={merk}
            onChange={(e) => {
              setMerk(e.target.value);
            }}
          />
          <Select
            data={typeOptions}
            label="Device Type"
            description="Select to fill specifications"
            placeholder="Select one Device Type"
            clearable
            onChange={typeChangeHandler}
            value={deviceTypeId}
          />
          <Divider my={"md"} variant="dotted" />
          <Group position="apart">
            <Button
              onClick={backButtonHandler}
              color="orange"
              leftIcon={<ArrowLeft />}
              radius="md"
            >
              Back
            </Button>
            <Button
              rightIcon={<DeviceFloppy />}
              radius={"md"}
              onClick={saveButtonHandler}
            >
              Update
            </Button>
          </Group>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
