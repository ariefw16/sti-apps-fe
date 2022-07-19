import { Checkbox, Group, Paper, Select, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { useRecoilValue } from "recoil";
import { meetingUpdateLoadingState } from "../../utils/store";
import { MeetingUpdate } from "../../utils/type";

export default function MeetingPropsEditForm(props: { form: UseFormReturnType<MeetingUpdate> }) {
  const { form } = props
  const loading = useRecoilValue(meetingUpdateLoadingState)

  return (
    <Paper p={20} radius="lg">
      <TextInput
        my="sm"
        label="Meeting Password"
        description="Set password for entrance in meeting" placeholder="Input Password here.."
        disabled={loading}
        {...form.getInputProps('password')}
      />
      <Select
        my="lg"
        data={['both', 'telephony', 'voip']}
        label="Audio"
        description="Set Audio settings"
        disabled={loading}
        {...form.getInputProps('audio')}
      />
      <Select data={['none', 'local', 'cloud']}
        label="Auto Record"
        description="Set Auto Recording when the meeting start"
        {...form.getInputProps('autoRecording')}
        disabled={loading}
        my="lg"
      />
      <Checkbox label="Enable Breakout room?"
        {...form.getInputProps('enableBreakout')}
        defaultChecked={form.getInputProps('enableBreakout').value}
        my="lg"
        disabled={loading}
      />
      <Checkbox label="Turn on Host Video"
        {...form.getInputProps('hostVideo')}
        defaultChecked={form.getInputProps('hostVideo').value}
        my="lg"
        disabled={loading}
      />
      <Checkbox label="Participant can join before host ?"
        {...form.getInputProps('joinBeforeHost')}
        defaultChecked={form.getInputProps('joinBeforeHost').value}
        my="lg"
        disabled={loading}
      />
      {form.getInputProps('joinBeforeHost').value === true ?
        <Group>
          <Select data={['0', '5', '10']}
            label="Join Before host timing"
            description="Set timing for joining before host: 5 minutes, 10 minutes, or 0 for anytime"
            {...form.getInputProps('jbhTimeString')}
            disabled={loading}
          />
        </Group> : undefined
      }
      <Checkbox label="Mute participant upon entry"
        {...form.getInputProps('muteUponEntry')}
        defaultChecked={form.getInputProps('muteUponEntry').value}
        my="lg"
        disabled={loading}
      />
      <Checkbox label="Set Participant Video on"
        {...form.getInputProps('participantVideo')}
        defaultChecked={form.getInputProps('participantVideo').value}
        my="lg"
        disabled={loading}
      />
    </Paper>
  )
}
