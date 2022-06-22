import { AppShell, Box, ScrollArea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../../features/Auth/utils/store";
import { fetchSettings } from "../../../features/Settings/utils/service";
import {
  settingsTriggerState,
  settingsState,
} from "../../../features/Settings/utils/store";
import { fetchProfile } from "../../../features/Users/utils/service";
import { darkModeState } from "../../../stores/ui.store";
import { AppNavbar } from "./AppNavbar";

export default function AppLayout() {
  const isDarkMode = useRecoilValue(darkModeState);
  const settingsTrigger = useRecoilValue(settingsTriggerState);
  const setSettings = useSetRecoilState(settingsState);
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.accessToken) {
      const token = localStorage.getItem("accessToken");
      if (token === null || token === "") navigate("/auth");
      else {
        fetchProfile()
          .then((res) => {
            setAuth({ accessToken: token, user: res });
          })
          .catch((e) => {
            showNotification({
              title: "Authentication",
              message: `Error! ${e.message}`,
              color: "red",
            });
            navigate("/auth");
          });
      }
    }
  }, []);

  useEffect(() => {
    fetchSettings().then((res) => {
      setSettings(res);
    });
  }, [settingsTrigger]);

  return (
    <AppShell
      fixed
      navbar={<AppNavbar />}
      styles={(theme) => ({
        main: {
          backgroundColor: isDarkMode
            ? theme.colors.dark[8]
            : theme.colors.gray[1],
        },
      })}
    >
      <ScrollArea>
        <Box sx={{ padding: 20 }}>
          <Outlet />
        </Box>
      </ScrollArea>
    </AppShell>
  );
}
