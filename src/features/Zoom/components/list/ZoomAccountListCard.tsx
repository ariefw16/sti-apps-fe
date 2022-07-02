import { Paper, Divider } from "@mantine/core";
import { useRecoilState, useRecoilValue } from "recoil";
import ListFooterCard from "../../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../../components/common/ListHeaderCard";
import RefreshButton from "../../../../components/common/RefreshButton";
import { zoomListCountState, zoomListFilterState } from "../../utils/store";
import ZoomAccountListTable from "./ZoomListTable";

export default function ZoomAccountListCard() {
  const rowCount = useRecoilValue(zoomListCountState)
  const [filter, setFilter] = useRecoilState(zoomListFilterState)

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

  return <Paper radius={"lg"} p="lg" sx={{ marginTop: 50 }}>
    <ListHeaderCard refreshButton={<RefreshButton onClick={applyToggleRefresh} />} search={filter.q} setSearch={setSearch} />
    <ZoomAccountListTable />
    <Divider my="sm" variant="dotted" />
    <ListFooterCard
      onPageChange={pageChangeHandler}
      onRowPerPageChange={rowsChangeHandler}
      rows={rowCount}
      page={filter.page}
      rowsPerPage={filter.limit?.toString()}
    />
  </Paper>
}
