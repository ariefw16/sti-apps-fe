import { Divider, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { zoomAccountDetailState } from "../../utils/store";

export default function ZoomAccountInfoDetail() {
  const account = useRecoilValue(zoomAccountDetailState)

  return <Paper p={20} radius="lg">
    <Title order={5}>Account Information</Title>
    <Divider my="md" variant="dotted" />
    <TextInput
      my="sm"
      label="Email Account"
      description="Email Account used to access Zoom" placeholder="Email Zoom Account"
      readOnly
      value={account.name || ''}
    />
    <PasswordInput
      my="sm"
      label="Client ID"
      description="Client ID from zoom.us to connect Account" placeholder="Input Client ID"
      readOnly
      value={account.client_id || ''}
    />
    <PasswordInput
      my="sm"
      label="Account ID"
      description="Account ID from zoom.us to connect Account" placeholder="Input Account ID"
      readOnly
      value={account.account_id || ''}
    />
  </Paper>
}
