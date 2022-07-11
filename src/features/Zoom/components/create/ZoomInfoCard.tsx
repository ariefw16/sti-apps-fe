import { Divider, Paper, Title, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { ZoomAccountCreate } from "../../utils/type";

export default function ZoomInfoCard(props: { form: UseFormReturnType<ZoomAccountCreate> }) {
  const { form } = props
  return (
    <Paper p={20} radius="lg">
      <Title order={5}>Account Information</Title>
      <Divider variant="dotted" my="md" />
      <TextInput
        my="sm"
        label="Email Account"
        description="Email Account used to access Zoom" placeholder="Email Zoom Account"
        {...form.getInputProps('email')}
      />
    </Paper>
  )
}
