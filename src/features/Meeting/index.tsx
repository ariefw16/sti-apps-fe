import { Box, LoadingOverlay, Tabs } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { History, Video } from "tabler-icons-react";
import DeleteDialog from "../../components/common/DeleteDialog";
import PageTitleComponent from "../../components/common/PageTitle";
import TabNav from "../../components/common/TabNav";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import ApprovalMeetingModal from "./components/ApprovalMeetingModal";
import CancelMeetingDialog from "./components/CancelMeetingModal";
import HistoryMeetingCard from "./components/list/HistoryMeetingCard";
import MeetingListCard from "./components/list/MeetingCard";
import { deleteMeeting, fetchMeeting } from "./utils/service";
import {
  meetingDeleteState,
  meetingListCountState,
  meetingListFilterState,
  meetingListState,
} from "./utils/store";

export default function MeetingPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Meeting Management",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [loadingDeletion, setLoadingDeletion] = useState(false);
  const setRowCount = useSetRecoilState(meetingListCountState);
  const setMeeting = useSetRecoilState(meetingListState);
  const [filter, setFilter] = useRecoilState(meetingListFilterState);
  const [q] = useDebouncedValue(filter.q, 300);
  const deletion = useRecoilValue(meetingDeleteState);
  const resetDeletion = useResetRecoilState(meetingDeleteState);

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

  const deleteHandler = () => {
    setLoadingDeletion(true);
    deleteMeeting(deletion.data.id)
      .then(() => {
        showNotification({
          title: "Delete Meetings",
          message: `Deletion Meetings Done!`,
          color: "green",
        });
        setFilter((x) => ({ ...x, refreshToggle: !x.refreshToggle }));
        resetDeletion();
      })
      .catch((e) => {
        showNotification({
          title: "Delete Meetings",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoadingDeletion(false);
      });
  };

  return (
    <>
      <PageTitleComponent breadcrumbs={breadcrumbs} title="Meetings" />
      <TabNav mt={30} position="left">
        <Tabs.Tab label="Schedule" icon={<Video />}>
          <Box style={{ position: "relative" }}>
            <LoadingOverlay visible={loading} />
            <MeetingListCard />
          </Box>
        </Tabs.Tab>
        <Tabs.Tab label="History" icon={<History />}>
          <Box style={{ position: "relative" }}>
            <LoadingOverlay visible={loading} />
            <HistoryMeetingCard />
          </Box>
        </Tabs.Tab>
      </TabNav>
      <DeleteDialog
        data={deletion.data}
        onClose={resetDeletion}
        open={deletion.showModal}
        onSubmit={deleteHandler}
        loading={loadingDeletion}
      />
      <ApprovalMeetingModal />
      <CancelMeetingDialog />
    </>
  );
}
