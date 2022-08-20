import { Paper } from "@mantine/core";

export default function DashboardCard(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <Paper radius={"lg"} p={20}>
      {children}
    </Paper>
  );
}
