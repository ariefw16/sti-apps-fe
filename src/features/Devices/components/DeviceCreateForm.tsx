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
import { useRecoilValue } from "recoil";
import { ArrowLeft, DeviceFloppy } from "tabler-icons-react";
import { z } from "zod";
import { deviceSpecCreateState } from "../utils/store";
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
    },
    schema: zodResolver(schema),
  });
  const deviceSpec = useRecoilValue(deviceSpecCreateState);

  const submitFormHandler = (data: CreateDevice) => {};

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
        <Select
          my={"sm"}
          label="Unit"
          description="Select unit where this device is located"
          data={[]}
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
          <Button color={"orange"} leftIcon={<ArrowLeft />} radius="md">
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
