import { Paper, Divider, Box, LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import AddButton from "../../../../components/common/AddButton";
import ListFooterCard from "../../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../../components/common/ListHeaderCard";
import RefreshButton from "../../../../components/common/RefreshButton";
import { fetchMeeting } from "../../utils/service";
import {
  meetingListCountState,
  meetingListFilterState,
  meetingListState,
} from "../../utils/store";
import MeetingFilterForm from "./MeetingFilterForm";
import MeetingListTable from "./MeetingListTable";

export default function MeetingListCard() {
  const [filter, setFilter] = useRecoilState(meetingListFilterState);
  const navigate = useNavigate();
  const rowCount = useRecoilValue(meetingListCountState);
  const [loading, setLoading] = useState(false);
  const setRowCount = useSetRecoilState(meetingListCountState);
  const setMeeting = useSetRecoilState(meetingListState);
  const [q] = useDebouncedValue(filter.q, 300);

  useEffect(() => {
    setLoading(true);
    fetchMeeting(filter)
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
  const addButtonHandler = () => {
    navigate("/meetings/create");
  };

  return (
    <Box style={{ position: "relative" }}>
      <LoadingOverlay visible={loading} />
      <Paper radius={"lg"} p="lg" sx={{ marginTop: 10 }}>
        <ListHeaderCard
          addButton={<AddButton onClick={addButtonHandler} />}
          refreshButton={<RefreshButton onClick={applyToggleRefresh} />}
          search={filter.q}
          setSearch={setSearch}
          filterForm={<MeetingFilterForm />}
        />
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
    </Box>
  );
}
