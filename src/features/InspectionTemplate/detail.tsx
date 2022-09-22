import { Grid } from "@mantine/core";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import InspectionTemplateLineDetail from "./components/detail/DetailInfo";
import InspectionTemplateGeneralDetail from "./components/detail/GeneralInfo";

export default function DetailInspectionTemplatePage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    { label: "Inspection Template", to: "/inspection-template" },
    { label: "Detail" },
  ];

  return (
    <>
      <PageTitleComponent
        breadcrumbs={breadcrumbs}
        title="Detail Device Template"
      />
      <Grid sx={{ marginTop: 50 }}>
        <Grid.Col sm={12} md={5}>
          <InspectionTemplateGeneralDetail />
        </Grid.Col>
        <Grid.Col sm={12} md={7}>
          <InspectionTemplateLineDetail />
        </Grid.Col>
      </Grid>
    </>
  );
}
