import { Box, Grid, LoadingOverlay } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import InspectionTemplateLineDetail from "./components/detail/DetailInfo";
import InspectionTemplateGeneralEdit from "./components/edit/GeneralInfo";
import { fetchSingleInspectionTemplate } from "./utils/service";
import { inspectionTemplateState } from "./utils/store";
import { InspectionTemplate } from "./utils/type";

export default function EditInspectionTemplatePage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    { label: "Inspection Template", to: "/inspection-template" },
    { label: "Update Data" },
  ];
  const [loading, setLoading] = useState(false);
  const setData = useSetRecoilState(inspectionTemplateState);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchSingleInspectionTemplate(+id)
        .then((res) => {
          setData(res);
        })
        .catch((e) => {
          showNotification({
            title: "Fetch Data",
            message: `Error! ${e.message}`,
            color: "red",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      <PageTitleComponent
        breadcrumbs={breadcrumbs}
        title="Detail Device Template"
      />
      <Grid sx={{ marginTop: 50 }}>
        <Grid.Col sm={12} md={5}>
          <Box style={{ position: "relative" }}>
            <LoadingOverlay visible={loading} />
            <InspectionTemplateGeneralEdit loading={loading} />
          </Box>
        </Grid.Col>
        <Grid.Col sm={12} md={7}>
          <Box style={{ position: "relative" }}>
            <LoadingOverlay visible={loading} />
            <InspectionTemplateLineDetail />
          </Box>
        </Grid.Col>
      </Grid>
    </>
  );
}
