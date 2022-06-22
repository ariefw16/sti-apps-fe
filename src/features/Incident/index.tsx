import { Box, LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import IncidentListCard from "./components/list/IncidentListCard";
import { fetchIncidents } from "./utils/service";
import {
  incidentListCountState,
  incidentListFilterState,
  incidentListState,
} from "./utils/store";

export default function IncidentPage() {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useRecoilState(incidentListFilterState);
  const [q] = useDebouncedValue(filter.q, 300);
  const setIncident = useSetRecoilState(incidentListState);
  const setCount = useSetRecoilState(incidentListCountState);
  const breadcrumb: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Incidents",
    },
  ];

  useEffect(() => {
    setLoading(true);
    fetchIncidents(filter)
      .then((res) => {
        setIncident(res.data);
        setCount(res.rowCount);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Incident",
          message: `Error! ${e.message}`,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter.limit, filter.page, filter.refreshToggle, q]);

  return (
    <>
      <PageTitleComponent title="Incidents" breadcrumbs={breadcrumb} />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <IncidentListCard />
      </Box>
    </>
  );
}
