import {
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ArrowLeft, DeviceFloppy } from "tabler-icons-react";
import { z } from "zod";
import { SelectOptions } from "../../../types/common";
import { fetchUnit } from "../../Unit/utils/service";
import { createDevice } from "../utils/service";
import { deviceSpecCreateState, deviceTypeIdCreateState } from "../utils/store";
import { CreateDevice } from "../utils/type";

const schema = z.object({
  name: z.string().min(3),
  ipAddress: z.string().optional(),
});
export default function DeviceCreateForm() {
  const form = useForm<CreateDevice>({
    initialValues: {
      name: "",
      ipAddress: "",
      unitId: "",
      merk: "",
    },
    schema: zodResolver(schema),
  });
  const deviceSpec = useRecoilValue(deviceSpecCreateState);
  const navigate = useNavigate();
  const [unitOptions, setUnitOptions] = useState<SelectOptions[]>([]);
  const deviceTypeId = useRecoilValue(deviceTypeIdCreateState);

  useEffect(() => {
    fetchUnit({ parentId: null }).then((res) => {
      setUnitOptions(
        res.data.map((u) => ({ label: u.name!, value: u.id!.toString() }))
      );
    });
  }, []);

  const submitFormHandler = (data: CreateDevice) => {
    if (deviceSpec.length > 0)
      if (
        deviceSpec
          .filter((d) => d.deviceTypeSpec?.isMandatory)
          .some((d) => d.value === "")
      )
        showNotification({
          title: "Complete Form",
          message: "Fill required Specs Field",
          color: "red",
        });
      else {
        data.deviceSpecs = deviceSpec.map((sp) => {
          const { deviceTypeSpec, ...data } = sp;
          return data;
        });
        data.deviceTypeId = deviceTypeId;
        // console.log(data);
        createDevice(data)
          .then(() => {
            navigate("/device");
            showNotification({
              title: "Create Device",
              message: "Creation success!",
              color: "green",
            });
          })
          .catch((e) => {
            showNotification({
              title: "Create Device",
              message: `Error! ${e.message}`,
              color: "red",
            });
          });
      }
  };

  return (
    <Paper p={20} radius="lg">
      <form onSubmit={form.onSubmit(submitFormHandler)}>
        <Title order={5}>General Information</Title>
        <Divider my={"md"} variant="dotted" />
        <TextInput
          my={"sm"}
          label="Name"
          description="Input Device Name here.."
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          my={"sm"}
          label="Merk"
          description="Input Device Merk here.."
          required
          {...form.getInputProps("merk")}
        />
        <Select
          my={"sm"}
          label="Unit"
          description="Select unit where this device is located"
          data={unitOptions}
          required
          {...form.getInputProps("unitId")}
        />
        <Checkbox label="This Device is a spare" my={"md"} />
        <TextInput
          my={"sm"}
          label="IP Address"
          description="Input IP Address to monitor device"
          {...form.getInputProps("ipAddress")}
        />
        <Divider variant="dotted" my={"md"} />
        <Group position="apart">
          <Button
            color={"orange"}
            leftIcon={<ArrowLeft />}
            radius="md"
            onClick={() => {
              navigate("/device");
            }}
          >
            Back
          </Button>
          <Button type="submit" radius={"md"} rightIcon={<DeviceFloppy />}>
            Create
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
