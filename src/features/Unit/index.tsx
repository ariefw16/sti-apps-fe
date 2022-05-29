import { LoadingOverlay, Box } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PageTitle from "../../components/common/PageTitle";
import { fetchUnit } from "../../services/unit.service";
import {
  unitFilterState,
  unitListCountState,
  unitListState,
  unitPagingFilterState,
} from "../../stores/unit.store";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import UnitListCard from "./components/UnitListCard";

export default function UnitPage() {
  const setUnit = useSetRecoilState(unitListState);
  const setRowCount = useSetRecoilState(unitListCountState);
  const filter = useRecoilValue(unitFilterState);
  const pageFilter = useRecoilValue(unitPagingFilterState);
  const [searchFilter] = useDebouncedValue(filter.search, 500);
  const [isLoading, setIsLoading] = useState(false);
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Unit Management",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    fetchUnit({
      limit: pageFilter.limit,
      page: pageFilter.page,
      q: searchFilter,
      parentId: filter.parentId,
    })
      .then((res) => {
        setUnit(res.data);
        setRowCount(res.rowCount);
      })
      .catch((e) => {
        showNotification({ message: e.message, color: "red" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pageFilter, searchFilter, filter.toggleRefresh]);

  return (
    <>
      <PageTitle title="Unit Management" breadcrumbs={breadcrumbs} />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={isLoading} />
        <UnitListCard />
      </Box>
    </>
  );
}
