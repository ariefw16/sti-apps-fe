import { Grid } from "@mantine/core";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import DeviceCreateForm from "./components/DeviceCreateForm";
import DeviceTypeSpecsCard from "./components/DeviceTypeSpecsCard";

export default function CreateDevicePage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    { label: "Home", to: "/" },
    { label: "Device Management", to: "/device" },
    { label: "Create New" },
  ];

  return (
    <>
      <PageTitleComponent breadcrumbs={breadcrumbs} title="Createa Device" />
      <Grid mt={50}>
        <Grid.Col span={4}>
          <DeviceTypeSpecsCard />
        </Grid.Col>
        <Grid.Col span={8}>
          <DeviceCreateForm />
        </Grid.Col>
      </Grid>
    </>
  );
}
