import { useEffect, useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import {
  Icon as TablerIcon,
  ChevronLeft,
  ChevronRight,
} from "tabler-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeMenuState } from "../../../stores/navbar.store";
import { darkModeState } from "../../../stores/ui.store";

interface LinksGroupProps {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  link?: string;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
}: LinksGroupProps) {
  const isDarkMode = useRecoilValue(darkModeState);
  const useStyles = createStyles((theme) => ({
    control: {
      fontWeight: 500,
      display: "block",
      width: "100%",
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      color: isDarkMode ? theme.colors.dark[0] : theme.black,
      fontSize: theme.fontSizes.sm,

      "&:hover": {
        backgroundColor: isDarkMode
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
        color: isDarkMode ? theme.white : theme.black,
      },
    },

    link: {
      fontWeight: 500,
      display: "block",
      textDecoration: "none",
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      paddingLeft: 31,
      marginLeft: 30,
      fontSize: theme.fontSizes.sm,
      color: isDarkMode ? theme.colors.dark[0] : theme.colors.gray[7],
      borderLeft: `1px solid ${
        isDarkMode ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,

      "&:hover": {
        backgroundColor: isDarkMode
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
        color: isDarkMode ? theme.white : theme.black,
      },
    },

    active: {
      fontWeight: 500,
      display: "block",
      textDecoration: "none",
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      paddingLeft: 31,
      marginLeft: 30,
      fontSize: theme.fontSizes.sm,
      color: isDarkMode ? theme.colors.dark[0] : theme.colors.gray[7],
      backgroundColor: isDarkMode ? theme.colors.dark[7] : theme.colors.blue[0],
      borderLeft: `1px solid ${
        isDarkMode ? theme.colors.dark[4] : theme.colors.blue[3]
      }`,

      "&:hover": {
        backgroundColor: isDarkMode
          ? theme.colors.dark[7]
          : theme.colors.blue[1],
        color: isDarkMode ? theme.white : theme.black,
      },
    },

    activeControl: {
      fontWeight: 500,
      display: "block",
      width: "100%",
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      color: isDarkMode ? theme.colors.dark[0] : theme.black,
      backgroundColor: isDarkMode ? theme.colors.dark[7] : theme.colors.blue[0],
      fontSize: theme.fontSizes.sm,

      "&:hover": {
        backgroundColor: isDarkMode
          ? theme.colors.dark[7]
          : theme.colors.blue[1],
        color: isDarkMode ? theme.white : theme.black,
      },
    },

    chevron: {
      transition: "transform 200ms ease",
    },
  }));
  const { classes, theme } = useStyles();
  const [active, setActive] = useRecoilState(activeMenuState);
  const navigate = useNavigate();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? ChevronRight : ChevronLeft;
  const items = (hasLinks ? links : []).map((link) => (
    <Link
      to={link.link}
      className={active === link.link ? classes.active : classes.link}
      key={link.label}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  useEffect(() => {
    if (hasLinks) setOpened(links.some((x) => active.includes(x.link)));
  }, []);

  const menuClick = (linkTo?: string) => {
    setOpened((o) => !o);
    if (linkTo) {
      setActive(linkTo);
      navigate(linkTo);
    }
  };

  return (
    <>
      <UnstyledButton
        onClick={() => {
          menuClick(link);
        }}
        className={active === link ? classes.activeControl : classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
