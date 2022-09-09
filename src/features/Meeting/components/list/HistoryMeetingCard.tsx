import { Divider, Paper } from "@mantine/core";
import { useRecoilState, useRecoilValue } from "recoil";
import ListFooterCard from "../../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../../components/common/ListHeaderCard";
import RefreshButton from "../../../../components/common/RefreshButton";
import {
  historyMeetingListCountState,
  historyMeetingListFilterState,
} from "../../utils/store";
import HistoryMeetingTable from "./HistoryMeetingTable";

export default function HistoryMeetingCard() {
  const [filter, setFilter] = useRecoilState(historyMeetingListFilterState);
  const rowCount = useRecoilValue(historyMeetingListCountState);

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
