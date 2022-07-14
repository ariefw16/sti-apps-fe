import { Paper, Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import AddButton from "../../../../components/common/AddButton";
import ListFooterCard from "../../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../../components/common/ListHeaderCard";
import RefreshButton from "../../../../components/common/RefreshButton";
import { meetingListCountState, meetingListFilterState } from "../../utils/store";
import MeetingFilterForm from "./MeetingFilterForm";
import MeetingListTable from "./MeetingListTable";

export default function MeetingListCard() {
  const [filter, setFilter] = useRecoilState(meetingListFilterState)
  const navigate = useNavigate()
  const rowCount = useRecoilValue(meetingListCountState)

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
  const addButtonHandler = () => {
    navigate('/meetings/create')
  }

  return <Paper radius={"lg"} p="lg" sx={{ marginTop: 50 }}>
    <ListHeaderCard
      addButton={<AddButton onClick={addButtonHandler} />}
      refreshButton={<RefreshButton onClick={applyToggleRefresh} />}
      search={filter.q}
      setSearch={setSearch}
      filterForm={<MeetingFilterForm />} />
    <MeetingListTable />
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
