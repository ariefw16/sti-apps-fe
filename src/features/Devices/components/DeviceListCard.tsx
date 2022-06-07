import { Divider, Paper } from "@mantine/core";
import { useRecoilState } from "recoil";
import AddButton from "../../../components/common/AddButton";
import ListFooterCard from "../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../components/common/ListHeaderCard";
import RefreshButton from "../../../components/common/RefreshButton";
import { deviceListCountState, deviceListFilterState } from "../utils/store";
import DeviceTable from "./DeviceTable";

export default function DeviceListCard() {
  const [filter, setFilter] = useRecoilState(deviceListFilterState);
  const [rowCount, setRowCount] = useRecoilState(deviceListCountState);

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
    <Paper radius={"lg"} p="lg" sx={{ marginTop: 50 }}>
      <ListHeaderCard
        noFilterButton
        addButton={
          <AddButton
            onClick={() => {
              // setShowCreateModal(true);
            }}
          />
        }
        refreshButton={<RefreshButton onClick={applyToggleRefresh} />}
        setSearch={setSearch}
        search={filter.q}
      />
      <DeviceTable />
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
