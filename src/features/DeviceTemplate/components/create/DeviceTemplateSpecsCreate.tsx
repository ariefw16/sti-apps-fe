import { Paper, Title, Divider } from "@mantine/core";

export default function DeviceTemplateGeneralCreate() {
  return (
    <Paper p={20} radius="lg">
      <Title order={5}>Specifications</Title>
      <Divider my={"md"} variant="dotted" />
    </Paper>
  );
}
