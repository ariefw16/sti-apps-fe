import {
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useRecoilValue } from "recoil";
import { zoomAccountDetailState } from "../../utils/store";
import moment from "moment";
import { UserCheck } from "tabler-icons-react";

export default function ZoomAccountInfoDetail() {
  const account = useRecoilValue(zoomAccountDetailState);

  const redirectOauth = () => {
    console.log(import.meta.env.VITE_OAUTH_ZOOM_REDIRECT_URI);
    // window.open(
    //   `https://zoom.us/oauth/authorize?response_type=code&client_id=${
    //     account.client_id
    //   }&redirect_uri=${import.meta.env.OAUTH_ZOOM_REDIRECT_URI}`,
    //   "_blank"
    // );
  };

  return (
    <Paper p={20} radius="lg">
      <Group position="apart">
        <Title order={5}>Account Information</Title>
        <Button
          size="xs"
          rightIcon={<UserCheck size={16} />}
          onClick={redirectOauth}
        >
          OAuth
        </Button>
      </Group>
      <Divider my="md" variant="dotted" />
      <TextInput
        my="sm"
        label="Email Account"
        description="Email Account used to access Zoom"
        placeholder="Email Zoom Account"
        readOnly
        variant="filled"
        value={account.email || ""}
      />
      {account.useApi && (
        <>
          <TextInput
            my="sm"
            label="API Type Connection"
            description="Connection Type to interact with Zoom"
            readOnly
            variant="filled"
            value={account.apiType}
          />
          <PasswordInput
            my="sm"
            label="Client ID"
            description="Client ID from zoom.us to connect Account"
            placeholder="Input Client ID"
            readOnly
            variant="filled"
            value={account.client_id || ""}
          />
          {account.apiType === "jwt" && (
            <PasswordInput
              my="sm"
              label="Account ID"
              description="Account ID from zoom.us to connect Account"
              placeholder="Input Account ID"
              readOnly
              variant="filled"
              value={account.account_id || ""}
            />
          )}
          <TextInput
            my="sm"
            label="Last Connection"
            description="Last connection established for any features"
            readOnly
            variant="filled"
            value={
              moment(account.lastCheck).format("DD-MMM-YYYY HH:mm:ss") || ""
            }
          />
        </>
      )}
      <TextInput
        my="sm"
        label="Max Participant"
        description="Participant allowed Limit from this account"
        readOnly
        variant="filled"
        value={account.maxParticipant + " Participant" || ""}
      />
    </Paper>
  );
}
