import { Divider, Paper } from "@mantine/core";
import RefreshButton from "../../../../components/common/RefreshButton";
import ListHeaderCard from "../../../../components/common/ListHeaderCard";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  groupCreateState,
  groupListCountState,
  groupListFilterState,
} from "../../utils/store";
import { GroupListTable } from "./GroupListTable";
import ListFooterCard from "../../../../components/common/ListFooterCard";
import AddButton from "../../../../components/common/AddButton";
import GroupCreateModal from "./GroupCreateModal";

export default function GroupListCard() {
  const [filter, setFilter] = useRecoilState(groupListFilterState);
  const rowCount = useRecoilValue(groupListCountState);
  const setCreation = useSetRecoilState(groupCreateState);

  const applyToggleRefresh = () => {
    setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
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
  const addButtonHandler = () => {
    setCreation({ showModal: true, data: { name: "" } });
  };

  return (
    <>
      <Paper radius={"lg"} p="lg" sx={{ marginTop: 50 }}>
        <ListHeaderCard
          refreshButton={<RefreshButton onClick={applyToggleRefresh} />}
          addButton={<AddButton onClick={addButtonHandler} />}
          setSearch={setSearch}
          search={filter.q}
        />
        <GroupListTable />
        <Divider my="sm" variant="dotted" />
        <ListFooterCard
          onPageChange={pageChangeHandler}
          onRowPerPageChange={rowsChangeHandler}
          rows={rowCount}
          rowsPerPage={filter.limit?.toString()}
          page={filter.page}
        />
      </Paper>
      <GroupCreateModal />
    </>
  );
}
