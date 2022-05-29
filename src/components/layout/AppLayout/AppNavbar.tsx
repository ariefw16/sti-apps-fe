import { Navbar, ScrollArea, createStyles } from "@mantine/core";
import { Notes, CalendarStats, Gauge, Lock } from "tabler-icons-react";
import { UserButton } from "./UserButton";
import { LinksGroup } from "./NavbarLinkGroup";
import { useRecoilValue } from "recoil";
import { darkModeState } from "../../../stores/ui.store";

const mockdata = [
  { label: "Dashboard", icon: Gauge, link: "/" },
  {
    label: "Services",
    icon: Notes,
    initiallyOpened: false,
    links: [
      { label: "Overview", link: "/services" },
      { label: "VPN", link: "/vpn" },
      { label: "Zoom", link: "/zoom-request" },
    ],
  },
  {
    label: "Infrastructure",
    icon: CalendarStats,
    links: [
      { label: "Overview", link: "/tasks" },
      { label: "Devices", link: "/my-tasks" },
      { label: "Incidents", link: "/personnel-tasks" },
      { label: "Device Type", link: "/personnel-tasks" },
    ],
  },
  {
    label: "Administration",
    icon: Lock,
    links: [
      { label: "Users", link: "/user" },
      { label: "Units", link: "/unit" },
      { label: "Settings", link: "/settings" },
    ],
  },
];

export function AppNavbar() {
  const isDarkMode = useRecoilValue(darkModeState);
  const useStyles = createStyles((theme) => ({
    navbar: {
      backgroundColor: isDarkMode ? theme.colors.dark[6] : theme.white,
      paddingBottom: 0,
    },

    header: {
      padding: theme.spacing.md,
      paddingTop: 0,
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      color: isDarkMode ? theme.white : theme.black,
      borderBottom: `1px solid ${
        isDarkMode ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },

    links: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
    },

    linksInner: {
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
    },

    footer: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
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
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name="Ann Nullpointer"
          email="anullpointer@yahoo.com"
        />
      </Navbar.Section>
    </Navbar>
  );
}
