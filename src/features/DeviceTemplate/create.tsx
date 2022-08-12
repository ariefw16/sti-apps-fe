import { Grid } from "@mantine/core";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import DeviceTemplateGeneralCreate from "./components/create/DeviceTemplateGeneralCreate";
import DeviceTemplateSpecsCreate from "./components/create/DeviceTemplateSpecsCreate";

export default function CreateDeviceTemplate() {
  const breadcrumb: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Device Management",
      to: "/device",
    },
    {
      label: "Create Device Template",
    },
  ];
  return (
    <>
      <PageTitleComponent
        breadcrumbs={breadcrumb}
        title="Create Device Template"
      />
      <Grid mt={50}>
        <Grid.Col sm={12} lg={7}>
          <DeviceTemplateGeneralCreate />
        </Grid.Col>
        <Grid.Col sm={12} lg={5}>
          <DeviceTemplateSpecsCreate />
        </Grid.Col>
      </Grid>
    </>
  );
}
