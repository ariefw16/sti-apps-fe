import {
  Button,
  Divider,
  Group,
  Paper,
  Select,
  TextInput,
} from "@mantine/core";
import { zodResolver, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { z } from "zod";
import { saveSettings } from "../utils/service";
import { notificationSettingState } from "../utils/store";
import { VpnNotificationSetting } from "../utils/type";

const vpnSchema = z.object({
  reminderVals: z.string(),
  reminderInterval: z.enum(["days", "week", "month"]),
});

export default function VpnNotifications() {
  const settings = useRecoilValue(notificationSettingState);
  const vpnForm = useForm<VpnNotificationSetting>({
    initialValues: {
      reminderVals: "0",
      reminderInterval: "days",
    },
    schema: zodResolver(vpnSchema),
  });

  useEffect(() => {
    const vpnSetting = settings.filter((f) => f.key === "vpn-reminder")[0];
    vpnForm.setFieldValue("reminderInterval", vpnSetting?.params || "days");
    vpnForm.setFieldValue("reminderVals", vpnSetting?.value || "0");
  }, [settings]);

  const vpnSubmitHandler = (data: VpnNotificationSetting) => {
    saveSettings({
      params: data.reminderInterval,
      value: data.reminderVals,
      key: "vpn-reminder",
    })
      .then(() => {
        showNotification({
          title: "Setting Update",
          message: "Setting Update Success!",
          color: "blue",
        });
      })
      .catch((e) => {
        showNotification({
          title: "Setting Update",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

  return (
    <Paper p={20} radius="lg">
      <form onSubmit={vpnForm.onSubmit(vpnSubmitHandler)}>
        <TextInput
          label="Reminder VPN Expired"
          rightSection={
            <Select
              data={["days", "week", "month"]}
              {...vpnForm.getInputProps("reminderInterval")}
            />
          }
          rightSectionWidth={130}
          {...vpnForm.getInputProps("reminderVals")}
        />
        <Divider my={20} />
        <Group position="right">
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Paper>
  );
}
