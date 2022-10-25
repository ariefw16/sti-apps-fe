import {
  Divider,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Group,
  NumberInput,
  Select,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { useRecoilValue } from "recoil";
import {
  zoomAccountCreateLoadingState,
  zoomAccountDetailState,
} from "../../utils/store";
import { ZoomAccountCreate } from "../../utils/type";
import moment from "moment";
import { useEffect, useState } from "react";

export default function ZoomInfoEdit(props: {
  form: UseFormReturnType<ZoomAccountCreate>;
}) {
  const { form } = props;
  const loading = useRecoilValue(zoomAccountCreateLoadingState);
  const account = useRecoilValue(zoomAccountDetailState);

  return (
    <Paper p={20} radius="lg">
      <Title order={5}>Account Information</Title>
      <Divider variant="dotted" my="md" />
      <TextInput
        my="sm"
        label="Email Account"
        description="Email Account used to access Zoom"
        placeholder="Email Zoom Account"
        disabled={loading}
        {...form.getInputProps("email")}
      />
      {form.values.useApi === "Yes" && (
        <>
          <Select
            data={["jwt", "oauth"]}
            label="Connection Type"
            {...form.getInputProps("apiType")}
            disabled={loading}
          />
          {form.values.apiType === "jwt" && (
            <PasswordInput
              my="sm"
              label="Account ID"
              description="Account ID from zoom.us to connect Account"
              placeholder="Input Account ID"
              disabled={loading}
              {...form.getInputProps("account_id")}
            />
          )}
          <PasswordInput
            my="sm"
            label="Client ID"
            description="Client ID from zoom.us to connect Account"
            placeholder="Input Client ID"
            disabled={loading}
            {...form.getInputProps("client_id")}
          />
          <PasswordInput
            my="sm"
            label="Secret Key"
            description="Secret Key from zoom.us to connect Account"
            placeholder="Enter Secret Key"
            disabled={loading}
            {...form.getInputProps("secretKey")}
          />
          <TextInput
            my="sm"
            label="Last Connection"
            description="Last connection established for any features"
            readOnly
            variant="filled"
            value={moment(account.lastCheck).format("DD-MMM-YYYY HH:mm:ss")}
          />
        </>
      )}
      <Group>
        <NumberInput
          my="sm"
          label="Max Participant"
          description="Participant allowed Limit from this account"
          placeholder="Input Max Participant"
          disabled={loading}
          {...form.getInputProps("maxParticipant")}
        />
      </Group>
    </Paper>
  );
}
