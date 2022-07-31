import PageTitleComponent from "../../components/common/PageTitle";
import { Box, filterFalsyChildren, LoadingOverlay } from "@mantine/core";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import { useEffect, useState } from "react";
import GroupListCard from "./components/list/GroupListCard";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  groupListCountState,
  groupListFilterState,
  groupListState,
} from "./utils/store";
import { fetchGroup } from "./utils/service";
import { showNotification } from "@mantine/notifications";
import { useDebouncedValue } from "@mantine/hooks";

export default function GroupPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "User Group Management",
    },
  ];
  const [loading, setLoading] = useState(false);
  const setGroup = useSetRecoilState(groupListState);
  const setRowCount = useSetRecoilState(groupListCountState);
  const filter = useRecoilValue(groupListFilterState);
  const [q] = useDebouncedValue(filter.q, 300);

  useEffect(() => {
    setLoading(true);
    fetchGroup(filter)
      .then((res) => {
        setRowCount(res.rowCount);
        setGroup(res.data);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Group",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [q, filter.page, filter.limit, filter.refreshToggle]);

  return (
    <>
      <PageTitleComponent
        title="User Group Management"
        breadcrumbs={breadcrumbs}
      />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <GroupListCard />
      </Box>
    </>
  );
}
