import { Paper, Title, TextInput, Divider, Grid, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import moment from "moment";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Copy, Link } from "tabler-icons-react";
import { zoomAccountDownloadDialogState } from "../../../Zoom/utils/store";
import { copyInvitationMeeting } from "../../utils/service";
import { meetingDetailState } from "../../utils/store";

export default function MeetingDetailForm() {
  const detail = useRecoilValue(meetingDetailState);
  const [loadingInvitation, setLoadingInvitation] = useState(false);
  const setShowDownload = useSetRecoilState(zoomAccountDownloadDialogState);

  const statusMeeting = (status: number) => {
    if (status === 0) return "Waiting for Approval";
    if (status === 1) return "Meeting Approved";
    if (status === 3) return "Meeting Cancelled";
  };
  const copyInvitationHandler = () => {
    setLoadingInvitation(true);
    copyInvitationMeeting({ id: detail.id! })
      .then((res) => {
        navigator.clipboard.writeText(res);
        showNotification({
          message: "Invitation Text Copied!",
          color: "teal",
        });
      })
      .catch((e) => {
        showNotification({
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoadingInvitation(false);
      });
  };

  const downloadRecordingHandler = () => {
    setShowDownload({
      showModal: true,
      meetingId: detail.idMeeting ? +detail.idMeeting : undefined,
      accountId: detail.zoomAccountId!,
    });
  };

  return (
    <Paper p={20} radius="lg">
      <Title order={5}>Meeting Information</Title>
      <Divider variant="dotted" my="md" />
      <TextInput
        my="sm"
        label="Meeting Name"
        description="Meeting Name or Agenda of Meeting"
        placeholder="Input Agenda"
        readOnly
        variant="filled"
        value={detail.name || ""}
      />
      <TextInput
        my="sm"
        label="Meeting Time"
        description="Meeting time to launch"
        readOnly
        variant="filled"
        value={
          moment(detail.startDate).format("ddd, DD-MMM-YYYY (HH:mm)") || ""
        }
      />
      <TextInput
        my="sm"
        label="Duration"
        description="Duration Estimate of this meeting (in minutes)"
        readOnly
        variant="filled"
        value={detail.duration + " min" || ""}
      />
      <TextInput
        my="sm"
        label="Expected Participant"
        description="Participant to attend Meeting"
        readOnly
        variant="filled"
        value={detail.expectedParticipant + " participants" || ""}
      />
      <TextInput
        my="sm"
        label="Status"
        description="Approval Status"
        readOnly
        variant="filled"
        value={statusMeeting(detail.status!) || ""}
      />
      <Divider variant="dotted" my="lg" />
      <TextInput
        my="sm"
        label="Zoom Account"
        description="Zoom Account used to meeting"
        readOnly
        variant="filled"
        value={detail.zoomAccount?.name ?? ""}
      />
      <TextInput
        my="sm"
        label="Requested By"
        description="User / Employee who request the meeting"
        readOnly
        variant="filled"
        value={`${detail.requestorName} (${detail.requestorEmail})`}
      />
      {moment(detail.startDate).toDate() > new Date() && (
        <Grid>
          <Grid.Col span={5}>
            <TextInput
              my="sm"
              label="Join URL"
              description="Use this url to join the meeting"
              readOnly
              variant="filled"
              value={detail.joinUrl ?? ""}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Button
              size="xs"
              mt={60}
              variant="outline"
              leftIcon={<Link />}
              color="orange"
              onClick={() => {
                navigator.clipboard.writeText(detail.joinUrl ?? "");
                showNotification({
                  message: "URL to Join meeting Copied!",
                  color: "orange",
                });
              }}
            >
              Copy URL
            </Button>
          </Grid.Col>
          <Grid.Col span={3}>
            <Button
              size="xs"
              mt={60}
              variant="gradient"
              leftIcon={<Copy />}
              color="green"
              onClick={copyInvitationHandler}
              loading={loadingInvitation}
            >
              Copy Invitation
            </Button>
          </Grid.Col>
        </Grid>
      )}
      {moment(detail.startDate).toDate() < new Date() && (
        <Button
          my="lg"
          variant="outline"
          color={"teal"}
          onClick={downloadRecordingHandler}
        >
          Download Recording
        </Button>
      )}
    </Paper>
  );
}
