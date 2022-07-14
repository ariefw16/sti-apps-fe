import { Divider, Paper, Title, TextInput, PasswordInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { useRecoilValue } from "recoil";
import { zoomAccountCreateLoadingState } from "../../utils/store";
import { ZoomAccountCreate } from "../../utils/type";

export default function ZoomInfoEdit(props: { form: UseFormReturnType<ZoomAccountCreate> }) {
  const { form } = props
  const loading = useRecoilValue(zoomAccountCreateLoadingState)
  return (
    <Paper p={20} radius="lg">
      <Title order={5}>Account Information</Title>
      <Divider variant="dotted" my="md" />
      <TextInput
        my="sm"
        label="Email Account"
        description="Email Account used to access Zoom" placeholder="Email Zoom Account"
        disabled={loading}
        {...form.getInputProps('email')}
      />
      <PasswordInput
        my="sm"
        label="Client ID"
        description="Client ID from zoom.us to connect Account" placeholder="Input Client ID"
        disabled={loading}
        {...form.getInputProps('client_id')}
      />
      <PasswordInput
        my="sm"
        label="Account ID"
        description="Account ID from zoom.us to connect Account" placeholder="Input Account ID"
        disabled={loading}
        {...form.getInputProps('account_id')}
      />
      <PasswordInput
        my="sm"
        label="Secret Key"
        description="Secret Key from zoom.us to connect Account" placeholder="Enter Secret Key"
        disabled={loading}
        {...form.getInputProps('secretKey')}
      />
    </Paper>
  )
}
