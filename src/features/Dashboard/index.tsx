import { Grid } from "@mantine/core";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import DashboardCard from "./components/DashboardCard";

export default function DashboardPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
    },
    {
      label: "Dashboard",
    },
  ];
  return (
    <>
      <PageTitleComponent breadcrumbs={breadcrumbs} title="App Dashboard" />
      <Grid mt={40}>
        <Grid.Col sm={12} md={8}>
          <DashboardCard>Tes</DashboardCard>
        </Grid.Col>
        <Grid.Col sm={12} md={4}>
          <DashboardCard>Tes</DashboardCard>
        </Grid.Col>
        <Grid.Col sm={12} md={8}>
          <DashboardCard>Tes</DashboardCard>
        </Grid.Col>
      </Grid>
    </>
  );
}
