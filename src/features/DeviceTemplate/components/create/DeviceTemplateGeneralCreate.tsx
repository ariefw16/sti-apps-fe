import {
  Select,
  Paper,
  Title,
  Divider,
  TextInput,
  Group,
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { DeviceFloppy, X } from "tabler-icons-react";
import { SelectOptions } from "../../../../types/common";
import { fetchDeviceType } from "../../../DeviceType/utils/service";
import {
  deviceTemplateCreateState,
  deviceTemplateSpecCreateState,
} from "../../utils/store";

export default function DeviceTemplateGeneralCreate() {
  const [typeOptions, setTypeOptions] = useState<SelectOptions[]>([]);
  const [data, setData] = useRecoilState(deviceTemplateCreateState);
  const spec = useRecoilValue(deviceTemplateSpecCreateState);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeviceType({}).then((res) => {
      setTypeOptions(
        res.data.map((dt) => ({
          value: dt.id?.toString() || "",
          label: dt.name || "",
        }))
      );
    });
  }, []);

  const typeChangeHandler = (value: string) => {
    setData((d) => ({ ...d, deviceTypeId: value }));
  };
  const cancelButtonHandler = () => {
    navigate(-1);
  };
  const saveButtonHandler = () => {
    console.log(data);
    console.log(spec);
  };

  return (
    <Paper p={20} radius="lg">
      <Title order={5}>General Information</Title>
      <Divider my={"md"} variant="dotted" />
      <TextInput
        my={"sm"}
        label="Name"
        description="Device Template Name, applied to all device"
        placeholder="ex: Unifi HD"
        value={data.name || ""}
        onChange={(e) => {
          setData((d) => ({ ...d, name: e.target.value }));
        }}
      />
      <Select
        data={typeOptions}
        label="Device Type"
        description="Select to fill specifications"
        placeholder="Select one Device Type"
        clearable
        onChange={typeChangeHandler}
      />
      <Divider my={"md"} variant="dotted" />
      <Group position="right">
        <Button
          variant="subtle"
          color={"orange"}
          leftIcon={<X />}
          radius="lg"
          onClick={cancelButtonHandler}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          radius={"lg"}
          rightIcon={<DeviceFloppy />}
          onClick={saveButtonHandler}
        >
          Save
        </Button>
      </Group>
    </Paper>
  );
}
