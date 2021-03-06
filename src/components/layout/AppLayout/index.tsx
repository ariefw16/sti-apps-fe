import { AppShell, Box, ScrollArea, Header, MediaQuery, Burger, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../../features/Auth/utils/store";
import { fetchSettings } from "../../../features/Settings/utils/service";
import {
  settingsTriggerState,
  settingsState,
} from "../../../features/Settings/utils/store";
import { fetchProfile } from "../../../features/Users/utils/service";
import { showBurgerState } from "../../../stores/navbar.store";
import { darkModeState } from "../../../stores/ui.store";
import { AppNavbar } from "./AppNavbar";

export default function AppLayout() {
  const isDarkMode = useRecoilValue(darkModeState);
  const settingsTrigger = useRecoilValue(settingsTriggerState);
  const setSettings = useSetRecoilState(settingsState);
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const [opened, setOpened] = useRecoilState(showBurgerState)

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
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>

            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <Text>STI Applications Portal</Text>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: isDarkMode
            ? theme.colors.dark[8]
            : theme.colors.gray[1],
        },
      })}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
    >
      <ScrollArea>
        <Box sx={{ padding: 20 }}>
          <Outlet />
        </Box>
      </ScrollArea>
    </AppShell>
  );
}
