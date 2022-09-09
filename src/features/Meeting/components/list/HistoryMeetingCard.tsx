import { Divider, Paper } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ListFooterCard from "../../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../../components/common/ListHeaderCard";
import RefreshButton from "../../../../components/common/RefreshButton";
import { fetchHistoryMeeting } from "../../utils/service";
import {
  historyMeetingListCountState,
  historyMeetingListFilterState,
  historyMeetingListState,
} from "../../utils/store";
import HistoryMeetingTable from "./HistoryMeetingTable";

export default function HistoryMeetingCard() {
  const [filter, setFilter] = useRecoilState(historyMeetingListFilterState);
  const [rowCount, setRowCount] = useRecoilState(historyMeetingListCountState);
  const setMeeting = useSetRecoilState(historyMeetingListState);
  const [loading, setLoading] = useState(false);
  const [q] = useDebouncedValue(filter.q, 300);

  useEffect(() => {
    setLoading(true);
    fetchHistoryMeeting(filter)
      .then((res) => {
        setMeeting(res.data);
        setRowCount(res.rowCount);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Meetings",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter.page, filter.limit, filter.refreshToggle, q]);

  const setSearch = (txt: string) => {
    setFilter((x) => ({ ...x, q: txt }));
  };
  const applyToggleRefresh = () => {
    setFilter((x) => ({ ...x, refreshToggle: !x.refreshToggle }));
  };
  const rowsChangeHandler = (value: string) => {
    setFilter((x) => ({ ...x, page: 1, limit: +value }));
  };
  const pageChangeHandler = (value: number) => {
    setFilter((x) => ({ ...x, page: value }));
  };

  return (
    <Paper radius={"lg"} p="lg" sx={{ marginTop: 10 }}>
      <ListHeaderCard
        refreshButton={<RefreshButton onClick={applyToggleRefresh} />}
        search={filter.q}
        setSearch={setSearch}
        noFilterButton
      />
      <HistoryMeetingTable />
      <Divider my="sm" variant="dotted" />
      <ListFooterCard
        onPageChange={pageChangeHandler}
        onRowPerPageChange={rowsChangeHandler}
        rows={rowCount}
        page={filter.page}
        rowsPerPage={filter.limit?.toString()}
      />
    </Paper>
  );
}
