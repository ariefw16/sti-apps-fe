import { Box, LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import DeleteDialog from "../../components/common/DeleteDialog";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import InspectionTemplateCard from "./components/list/TemplateCard";
import {
  deleteInspectionTemplate,
  fetchInspectionTemplate,
} from "./utils/service";
import {
  inspectionTemplateDeleteState,
  inspectionTemplateListCountState,
  inspectionTemplateListFilterState,
  inspectionTemplateListState,
} from "./utils/store";

export default function InspectionTemplatePage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    { label: "Inspection Template" },
  ];
  const [loading, setLoading] = useState(false);
  const setData = useSetRecoilState(inspectionTemplateListState);
  const setCount = useSetRecoilState(inspectionTemplateListCountState);
  const [filter, setFilter] = useRecoilState(inspectionTemplateListFilterState);
  const [q] = useDebouncedValue(filter.q, 300);
  const deletion = useRecoilValue(inspectionTemplateDeleteState);
  const resetDeletion = useResetRecoilState(inspectionTemplateDeleteState);

  useEffect(() => {
    setLoading(true);
    fetchInspectionTemplate(filter)
      .then((res) => {
        setData(res.data);
        setCount(res.rowCount);
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
  }, [q, filter.limit, filter.page, filter.refreshToggle]);

  const deleteHandler = () => {
    setLoading(true);
    deleteInspectionTemplate(deletion.data.id)
      .then(() => {
        resetDeletion();
        setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
        showNotification({
          title: "Inspection Template Deletion",
          message: "Inspection Template Deletion successful!",
          color: "green",
        });
      })
      .catch((e) => {
        showNotification({
          title: "Inspection Template Deletion",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <PageTitleComponent
        breadcrumbs={breadcrumbs}
        title="Inspection Template List"
      />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <InspectionTemplateCard />
      </Box>
      <DeleteDialog
        data={deletion.data}
        onClose={resetDeletion}
        open={deletion.showModal}
        onSubmit={deleteHandler}
      />
    </>
  );
}
