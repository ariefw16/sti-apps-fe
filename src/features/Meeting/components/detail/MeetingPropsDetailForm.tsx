import { Checkbox, Paper, Select, TextInput } from "@mantine/core";
import { useRecoilState } from "recoil";
import { meetingDetailState } from "../../utils/store";

export default function MeetingPropsDetailForm(props: {
  loading: boolean
}) {
  const [detail, setDetail] = useRecoilState(meetingDetailState)

  return (
    <Paper p={20} radius="lg">
      <TextInput
        my="sm"
        label="Meeting Password"
        description="Set password for entrance in meeting" placeholder="Input Password here.."
        readOnly
        value={detail.password || ''}
        variant="filled"
      />
      <TextInput
        my="lg"
        label="Audio"
        description="Audio settings"
        readOnly
        value={detail.audio || ''}
        variant="filled"
      />
      <TextInput
        label="Auto Record"
        description="Set Auto Recording when the meeting start"
        my="lg"
        readOnly
        value={detail.autoRecording || ''}
        variant="filled"
      />
      <Checkbox label="Enable Breakout room?"
        my="lg"
        readOnly
        checked={detail.enableBreakout || false}
      />
      <Checkbox label="Turn on Host Video"
        my="lg"
        readOnly
        checked={detail.hostVideo || false}
      />
      <Checkbox label="Participant can join before host ?"
        checked={detail.joinBeforeHost || false}
        my="lg"
        readOnly
      />
      {detail.joinBeforeHost === true &&
        <TextInput
          my="sm"
          label="Join Before Host time"
          description="Join Before Host Timing (0 for anytime)"
          readOnly
          value={detail.jbhTime || '0'}
          variant="filled"
        />
      }
      <Checkbox label="Mute participant upon entry"
        checked={detail.muteUponEntry || false}
        my="lg"
        readOnly
      />
      <Checkbox label="Set Participant Video on"
        checked={detail.participantVideo || false}
        my="lg"
        readOnly
      />
    </Paper>
  )
}
