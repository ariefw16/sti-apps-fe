import { useState } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Divider,
  Burger,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import {
  Logout,
  Heart,
  Star,
  Message,
  Settings,
  PlayerPause,
  Trash,
  SwitchHorizontal,
  ChevronDown,
} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
    // borderBottom: `1px solid ${
    //   theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    // }`,
    // height: 60,
    // marginBottom: 60,
  },

  mainSection: {
    paddingTop: theme.spacing.xs,
  },

  userMenu: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[2],
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[2],
  },
}));

export function AppHeader() {
  const { classes, theme, cx } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div className={classes.header}>
      <Group position="apart">
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />
        <div />

        <Menu
          size={260}
          placement="end"
          transition="pop-top-right"
          className={classes.userMenu}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          control={
            <UnstyledButton
              className={cx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              <Group spacing={7}>
                <Avatar
                  src="https://cathydoll.co.id/assets/frontend/images/photo_users/default-user-image.png"
                  alt={"User name"}
                  radius="xl"
                  size={20}
                />
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                  {"Username"}
                </Text>
                <ChevronDown size={12} />
              </Group>
            </UnstyledButton>
          }
        >
          <Menu.Item icon={<Heart size={14} color={theme.colors.red[6]} />}>
            Liked posts
          </Menu.Item>
          <Menu.Item icon={<Star size={14} color={theme.colors.yellow[6]} />}>
            Saved posts
          </Menu.Item>
          <Menu.Item icon={<Message size={14} color={theme.colors.blue[6]} />}>
            Your comments
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item icon={<Settings size={14} />}>Account settings</Menu.Item>
          <Menu.Item icon={<SwitchHorizontal size={14} />}>
            Change account
          </Menu.Item>
          <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>

          <Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item icon={<PlayerPause size={14} />}>
            Pause subscription
          </Menu.Item>
          <Menu.Item color="red" icon={<Trash size={14} />}>
            Delete account
          </Menu.Item>
        </Menu>
      </Group>
    </div>
  );
}
