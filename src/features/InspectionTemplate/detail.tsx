import { Box, Grid, LoadingOverlay } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import InspectionTemplateLineDetail from "./components/detail/DetailInfo";
import InspectionTemplateGeneralDetail from "./components/detail/GeneralInfo";
import { fetchSingleInspectionTemplate } from "./utils/service";
import {
  inspectionTemplateState,
  inspectionTemplateTriggerState,
} from "./utils/store";

export default function DetailInspectionTemplatePage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    { label: "Inspection Template", to: "/inspection-template" },
    { label: "Detail" },
  ];
  const { id } = useParams();
  const setData = useSetRecoilState(inspectionTemplateState);
  const [loading, setLoading] = useState(false);
  const trigger = useRecoilValue(inspectionTemplateTriggerState);

  useEffect(() => {
    setLoading(true);
    fetchSingleInspectionTemplate(+id!)
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Inspection Template",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [trigger]);

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
            <InspectionTemplateGeneralDetail loading={loading} />
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
