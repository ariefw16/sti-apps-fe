import { Box, LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import InspectionListCard from "./components/list/InspectionCard";
import { FetchInspection } from "./utils/service";
import {
  inspectionListCountState,
  inspectionListFilterState,
  inspectionListState,
} from "./utils/store";

export default function InspectionPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    { label: "Device Inspection" },
  ];
  const [loading, setLoading] = useState(false);
  const filter = useRecoilValue(inspectionListFilterState);
  const [q] = useDebouncedValue(filter.q, 300);
  const setData = useSetRecoilState(inspectionListState);
  const setCount = useSetRecoilState(inspectionListCountState);

  useEffect(() => {
    setLoading(true);
    FetchInspection(filter)
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
  }, [filter.limit, filter.page, filter.refreshToggle, q]);

  return (
    <>
      <PageTitleComponent breadcrumbs={breadcrumbs} title="Inspection List" />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <InspectionListCard />
      </Box>
    </>
  );
}
