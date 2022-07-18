import { Checkbox, Paper, Select, TextInput } from "@mantine/core";
import { useRecoilState } from "recoil";
import { meetingDetailState } from "../../utils/store";

export default function MeetingPropsDetailForm() {
  const [detail, setDetail] = useRecoilState(meetingDetailState)

  return (
    <Paper p={20} radius="lg">
      <TextInput
        my="sm"
        label="Meeting Password"
        description="Set password for entrance in meeting" placeholder="Input Password here.."
        disabled
      />
      <Select
        my="lg"
        data={['both', 'telephony', 'voip']}
        label="Audio"
        description="Set Audio settings"
      />
      <Select data={['none', 'local', 'cloud']}
        label="Auto Record"
        description="Set Auto Recording when the meeting start"
        my="lg"
      />
      <Checkbox label="Enable Breakout room?"
        defaultChecked={detail.enableBreakout}
        my="lg"
      />
      <Checkbox label="Turn on Host Video"
        defaultChecked={detail.hostVideo}
        my="lg"
      />
      <Checkbox label="Participant can join before host ?"
        defaultChecked={detail.joinBeforeHost}
        my="lg"
      />
      {detail.joinBeforeHost === true &&
        <TextInput
          my="sm"
          label="Join Before Host time"
          description="Join Before Host Timing (0 for anytime)"
          disabled
        />
      }
      <Checkbox label="Mute participant upon entry"
        defaultChecked={detail.muteUponEntry}
        my="lg"
      />
      <Checkbox label="Set Participant Video on"
        defaultChecked={detail.participantVideo}
        my="lg"
      />
    </Paper>
  )
}
