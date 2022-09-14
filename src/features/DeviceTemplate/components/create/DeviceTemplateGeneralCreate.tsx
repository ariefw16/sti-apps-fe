import {
  Select,
  Paper,
  Title,
  Divider,
  TextInput,
  Group,
  Button,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { DeviceFloppy, X } from "tabler-icons-react";
import { SelectOptions } from "../../../../types/common";
import { fetchDeviceType } from "../../../DeviceType/utils/service";
import { saveDeviceTemplate } from "../../utils/service";
import {
  deviceTemplateCreateState,
  deviceTemplateDevsCreateState,
  deviceTemplateLoadingCreateState,
  deviceTemplateSpecCreateState,
} from "../../utils/store";
import { CreateDeviceTemplate } from "../../utils/type";

export default function DeviceTemplateGeneralCreate() {
  const [typeOptions, setTypeOptions] = useState<SelectOptions[]>([]);
  const [data, setData] = useRecoilState(deviceTemplateCreateState);
  const [loading, setLoading] = useRecoilState(
    deviceTemplateLoadingCreateState
  );
  const spec = useRecoilValue(deviceTemplateSpecCreateState);
  const devices = useRecoilValue(deviceTemplateDevsCreateState);
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
    setLoading(true);
    const body: CreateDeviceTemplate = {
      deviceTemplateSpecs: spec,
      devices,
      name: data.name,
      deviceTypeId: data.deviceTypeId,
    };
    saveDeviceTemplate(body)
      .then((res) => {
        showNotification({
          title: "Device Template Creation",
          message: "Device Template Created successfully!",
          color: "green",
        });
        navigate(`/device-template/${res.id}`);
      })
      .catch((e) => {
        showNotification({
          title: "Device Template Creation",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
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
        disabled={loading}
      />
      <TextInput
        my={"sm"}
        label="Merk"
        description="Device Template Merk, applied to all device"
        placeholder="ex: Cisco / Ubiquiti"
        value={data.merk || ""}
        onChange={(e) => {
          setData((d) => ({ ...d, merk: e.target.value }));
        }}
        disabled={loading}
      />
      <Select
        data={typeOptions}
        label="Device Type"
        description="Select to fill specifications"
        placeholder="Select one Device Type"
        clearable
        onChange={typeChangeHandler}
        disabled={loading}
      />
      <Divider my={"md"} variant="dotted" />
      <Group position="right">
        <Button
          variant="subtle"
          color={"orange"}
          leftIcon={<X />}
          radius="lg"
          onClick={cancelButtonHandler}
          loading={loading}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          radius={"lg"}
          rightIcon={<DeviceFloppy />}
          onClick={saveButtonHandler}
          loading={loading}
        >
          Save
        </Button>
      </Group>
    </Paper>
  );
}
