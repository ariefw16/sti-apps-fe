import { Divider, Paper } from "@mantine/core";
import { useRecoilState, useRecoilValue } from "recoil";
import ListFooterCard from "../../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../../components/common/ListHeaderCard";
import RefreshButton from "../../../../components/common/RefreshButton";
import {
  HistoryincidentListCountState,
  HistoryincidentListFilterState,
} from "../../utils/store";
import ActivityListModal from "./ActivityListModal";
import HistoryIncidentListTable from "./HistoryTable";

export default function HistoryIncidentListCard() {
  const [filter, setFilter] = useRecoilState(HistoryincidentListFilterState);
  const rowCount = useRecoilValue(HistoryincidentListCountState);

  const applyToggleRefresh = () => {
    setFilter((x) => ({ ...x, refreshToggle: !x.refreshToggle }));
  };
  const setSearch = (vals: string) => {
    setFilter((f) => ({ ...f, q: vals }));
  };
  const rowsChangeHandler = (value: string) => {
    setFilter((x) => ({ ...x, page: 1, limit: +value }));
  };
  const pageChangeHandler = (value: number) => {
    setFilter((x) => ({ ...x, page: value }));
  };

  return (
    <>
      <Paper radius={"lg"} p="lg" sx={{ marginTop: 10 }}>
        <ListHeaderCard
          refreshButton={<RefreshButton onClick={applyToggleRefresh} />}
          setSearch={setSearch}
          search={filter.q}
          noFilterButton
        />
        <Divider my="sm" variant="dotted" />
        <HistoryIncidentListTable />
        <ListFooterCard
          onPageChange={pageChangeHandler}
          onRowPerPageChange={rowsChangeHandler}
          rows={rowCount}
          page={filter.page}
          rowsPerPage={filter.limit?.toString()}
        />
      </Paper>
      <ActivityListModal />
    </>
  );
}
