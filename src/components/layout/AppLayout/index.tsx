import { AppShell, Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { darkModeState } from "../../../stores/ui.store";
import { AppNavbar } from "./AppNavbar";

export default function AppLayout() {
  const isDarkMode = useRecoilValue(darkModeState);
  return (
    <AppShell
      navbar={<AppNavbar />}
      styles={(theme) => ({
        main: {
          backgroundColor: isDarkMode
            ? theme.colors.dark[8]
            : theme.colors.gray[1],
        },
      })}
    >
      <Box sx={{ padding: 20 }}>
        <Outlet />
      </Box>
    </AppShell>
  );
}
