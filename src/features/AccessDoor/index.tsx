import { Box, LoadingOverlay } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import IncidentListCard from "../Incident/components/list/IncidentListCard";
import AccessDoorListCard from "./components/AccessDoorListCard";
import { fetchAccessDoor } from "./utils/service";
import {
  accessDoorListCountState,
  accessDoorListFilterState,
  accessDoorListState,
} from "./utils/store";

export default function AccessDoorPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Access Door DC",
    },
  ];
  const [loading, setLoading] = useState(false);
  const setData = useSetRecoilState(accessDoorListState);
  const setCount = useSetRecoilState(accessDoorListCountState);
  const filter = useRecoilValue(accessDoorListFilterState);

  useEffect(() => {
    setLoading(true);
    fetchAccessDoor(filter)
      .then((res) => {
        setData(res.data);
        setCount(res.rowCount);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Access Door",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter.page, filter.limit, filter.refreshToggle]);

  return (
    <>
      <PageTitleComponent
        title="Access Door DataCenter"
        breadcrumbs={breadcrumbs}
      />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <AccessDoorListCard />
      </Box>
    </>
  );
}
