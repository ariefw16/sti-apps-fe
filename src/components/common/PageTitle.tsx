import {
  ActionIcon,
  Anchor,
  Box,
  Breadcrumbs,
  Group,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Bell, MoonStars, Settings, Sun } from "tabler-icons-react";
import { activeMenuState } from "../../stores/navbar.store";
import { darkModeState } from "../../stores/ui.store";
import { PageTitle } from "../../types/pagetitle.type";

export default function PageTitleComponent(params: PageTitle) {
  const { title, breadcrumbs } = params;
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);
  const setActiveMenu = useSetRecoilState(activeMenuState);
  const theme = useMantineTheme();

  const anchorHandler = (link?: string) => {
    if (link) setActiveMenu(link);
  };

  return (
    <Group position="apart">
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Title
          order={2}
          sx={(theme) => ({
            fontWeight: 600,
            fontFamily: theme.fontFamily,
          })}
        >
          {title}
        </Title>
        <Box sx={{ paddingTop: 5 }}>
          <Breadcrumbs
            separator="/"
            styles={{ separator: { color: theme.colors.gray[6] } }}
          >
            {breadcrumbs.map((x) => (
              <Anchor
                component={Link}
                key={x.label}
                to={x?.to || "#"}
                sx={(theme) => ({
                  color: theme.colors.gray[6],
                  fontSize: 14,
                })}
                onClick={() => {
                  anchorHandler(x.to);
                }}
              >
                {x.label}
              </Anchor>
            ))}
          </Breadcrumbs>
        </Box>
      </Box>
      <Group>
        <ActionIcon
          variant="default"
          sx={{
            "&:hover": { backgroundColor: theme.colors.blue[0] },
            backgroundColor: theme.colors.gray[1],
          }}
          size={"xl"}
          radius="lg"
        >
          <Bell />
        </ActionIcon>
        <ActionIcon
          variant="default"
          sx={{
            "&:hover": { backgroundColor: theme.colors.blue[0] },
            backgroundColor: theme.colors.gray[1],
          }}
          size={"xl"}
          radius="lg"
        >
          <Settings />
        </ActionIcon>
        <ActionIcon
          variant="default"
          sx={{
            "&:hover": { backgroundColor: theme.colors.blue[0] },
            backgroundColor: theme.colors.gray[1],
          }}
          size={"xl"}
          radius="lg"
          onClick={() => {
            setIsDarkMode((x) => !x);
          }}
        >
          {isDarkMode ? <MoonStars /> : <Sun />}
        </ActionIcon>
      </Group>
    </Group>
  );
}
