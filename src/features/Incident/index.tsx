import { Box, LoadingOverlay, Tabs } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AlertTriangle, History } from "tabler-icons-react";
import PageTitleComponent from "../../components/common/PageTitle";
import TabNav from "../../components/common/TabNav";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import HistoryIncidentListCard from "./components/list/HistoryListCard";
import IncidentListCard from "./components/list/IncidentListCard";
import { fetchIncidents } from "./utils/service";
import {
  HistoryincidentListCountState,
  HistoryincidentListFilterState,
  HistoryIncidentListState,
  incidentListCountState,
  incidentListFilterState,
  incidentListState,
} from "./utils/store";

export default function IncidentPage() {
  const [loading, setLoading] = useState(false);
  const filter = useRecoilValue(incidentListFilterState);
  const [q] = useDebouncedValue(filter.q, 300);
  const setIncident = useSetRecoilState(incidentListState);
  const setCount = useSetRecoilState(incidentListCountState);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const filterHistory = useRecoilValue(HistoryincidentListFilterState);
  const [qHistory] = useDebouncedValue(filterHistory.q, 300);
  const setIncidentHistory = useSetRecoilState(HistoryIncidentListState);
  const setCountHistory = useSetRecoilState(HistoryincidentListCountState);
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

  useEffect(() => {
    setLoadingHistory(true);
    fetchIncidents(filter)
      .then((res) => {
        setIncidentHistory(res.data);
        setCountHistory(res.rowCount);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Incident",
          message: `Error! ${e.message}`,
        });
      })
      .finally(() => {
        setLoadingHistory(false);
      });
  }, [
    filterHistory.limit,
    filterHistory.page,
    filterHistory.refreshToggle,
    qHistory,
  ]);

  return (
    <>
      <PageTitleComponent title="Incidents" breadcrumbs={breadcrumb} />
      <TabNav mt={30} position="right">
        <Tabs.Tab label={"Current Incident"} icon={<AlertTriangle />}>
          <Box style={{ position: "relative" }}>
            <LoadingOverlay visible={loading} />
            <IncidentListCard />
          </Box>
        </Tabs.Tab>
        <Tabs.Tab label={"History"} icon={<History />}>
          <Box style={{ position: "relative" }}>
            <LoadingOverlay visible={loadingHistory} />
            <HistoryIncidentListCard />
          </Box>
        </Tabs.Tab>
      </TabNav>
    </>
  );
}
