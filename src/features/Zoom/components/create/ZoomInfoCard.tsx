import { Divider, Paper, Title, TextInput, PasswordInput } from "@mantine/core";
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
      <TextInput
        my="sm"
        label="Client ID"
        description="Client ID from zoom.us to connect Account" placeholder="Input Client ID"
        {...form.getInputProps('client_id')}
      />
      <TextInput
        my="sm"
        label="Account ID"
        description="Account ID from zoom.us to connect Account" placeholder="Input Account ID"
        {...form.getInputProps('account_id')}
      />
      <PasswordInput
        my="sm"
        label="Secret Key"
        description="Secret Key from zoom.us to connect Account" placeholder="Enter Secret Key"
        {...form.getInputProps('secretKey')}
      />
    </Paper>
  )
}
