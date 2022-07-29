import { Navbar, ScrollArea, createStyles, Menu } from "@mantine/core";
import { Notes, CalendarStats, Gauge, Lock, Logout } from "tabler-icons-react";
import { UserButton } from "./UserButton";
import { LinksGroup } from "./NavbarLinkGroup";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { darkModeState } from "../../../stores/ui.store";
import { logout } from "../../../features/Auth/utils/service";
import { authState } from "../../../features/Auth/utils/store";
import { useNavigate } from "react-router-dom";
import { showBurgerState } from "../../../stores/navbar.store";

const mockdata = [
  { label: "Dashboard", icon: Gauge, link: "/" },
  {
    label: "Services",
    icon: Notes,
    initiallyOpened: false,
    links: [
      { label: "Overview", link: "/services" },
      { label: "VPN", link: "/vpn" },
      { label: "Meetings", link: "/meetings" },
      { label: "Zoom Account", link: "/zoom-account" },
    ],
  },
  {
    label: "Infrastructure",
    icon: CalendarStats,
    links: [
      { label: "Overview", link: "/tasks" },
      { label: "Devices", link: "/device" },
      { label: "Incidents", link: "/incident" },
      { label: "Device Type", link: "/device-type" },
    ],
  },
  {
    label: "Administration",
    icon: Lock,
    links: [
      { label: "Users", link: "/user" },
      { label: "Groups", link: "/groups" },
      { label: "Units", link: "/unit" },
      { label: "Settings", link: "/settings" },
    ],
  },
];

export function AppNavbar() {
  const opened = useRecoilValue(showBurgerState);
  const isDarkMode = useRecoilValue(darkModeState);
  const resetAuth = useResetRecoilState(authState);
  const navigate = useNavigate();
  const useStyles = createStyles((theme) => ({
    navbar: {
      backgroundColor: isDarkMode ? theme.colors.dark[6] : theme.white,
      paddingBottom: 0,
    },

    links: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
    },

    linksInner: {
      //  paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
    },

    footer: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      marginBottom: -theme.spacing.md,
      borderTop: `1px solid ${
        isDarkMode ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  }));
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Navbar
      width={{ sm: 300 }}
      hiddenBreakpoint="sm"
      hidden={!opened}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Menu
          withArrow
          sx={{ width: "100%" }}
          position="right"
          control={
            <UserButton
              image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              name="Harriette Spoonlicker"
              email="hspoonlicker@outlook.com"
            />
          }
        >
          <Menu.Item
            color="red"
            icon={<Logout size={14} />}
            onClick={() => {
              logout(resetAuth);
              navigate("/auth");
            }}
          >
            Log Out
          </Menu.Item>
        </Menu>
      </Navbar.Section>
    </Navbar>
  );
}
