import { Paper } from "@mantine/core";
import { useRecoilState, useRecoilValue } from "recoil";
import ListFooterCard from "../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../components/common/ListHeaderCard";
import RefreshButton from "../../../components/common/RefreshButton";
import {
  accessDoorListCountState,
  accessDoorListFilterState,
} from "../utils/store";
import AccessDoorListTable from "./AccessDoorListTable";

export default function AccessDoorListCard() {
  const rowCount = useRecoilValue(accessDoorListCountState);
  const [filter, setFilter] = useRecoilState(accessDoorListFilterState);

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
    <Paper radius={"lg"} p="lg" sx={{ marginTop: 50 }}>
      <ListHeaderCard
        noSearch={true}
        refreshButton={<RefreshButton onClick={applyToggleRefresh} />}
      />
      <AccessDoorListTable />
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
