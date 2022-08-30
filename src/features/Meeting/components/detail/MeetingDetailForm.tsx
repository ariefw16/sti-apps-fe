import { Paper, Title, TextInput, Divider } from "@mantine/core";
import moment from "moment";
import { useRecoilValue } from "recoil";
import { meetingDetailState } from "../../utils/store";

export default function MeetingDetailForm() {
  const detail = useRecoilValue(meetingDetailState);

  const statusMeeting = (status: number) => {
    if (status === 0) return "Waiting for Approval";
    if (status === 1) return "Meeting Approved";
    if (status === 3) return "Meeting Cancelled";
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
    </Paper>
  );
}
