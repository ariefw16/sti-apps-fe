import { Box, Tabs } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { History, Video } from "tabler-icons-react";
import DeleteDialog from "../../components/common/DeleteDialog";
import PageTitleComponent from "../../components/common/PageTitle";
import TabNav from "../../components/common/TabNav";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import ApprovalMeetingModal from "./components/ApprovalMeetingModal";
import CancelMeetingDialog from "./components/CancelMeetingModal";
import HistoryMeetingCard from "./components/list/HistoryMeetingCard";
import MeetingListCard from "./components/list/MeetingCard";
import { deleteMeeting } from "./utils/service";
import { meetingDeleteState, meetingListFilterState } from "./utils/store";

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
  const [loadingDeletion, setLoadingDeletion] = useState(false);
  const setFilter = useSetRecoilState(meetingListFilterState);
  const deletion = useRecoilValue(meetingDeleteState);
  const resetDeletion = useResetRecoilState(meetingDeleteState);

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
      <TabNav mt={30} position="right">
        <Tabs.Tab label="Schedule" icon={<Video />}>
          <MeetingListCard />
        </Tabs.Tab>
        <Tabs.Tab label="History" icon={<History />}>
          <Box style={{ position: "relative" }}>
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
