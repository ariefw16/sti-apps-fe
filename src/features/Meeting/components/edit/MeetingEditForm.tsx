import { Paper, Group, Title, TextInput, Divider, NumberInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form/lib/use-form'
import { MeetingUpdate } from '../../utils/type'
import { Clock } from "tabler-icons-react";
import { useRecoilValue } from 'recoil';
import { meetingUpdateLoadingState } from '../../utils/store';
import { DatePicker, TimeInput } from '@mantine/dates';

export default function MeetingEditForm(props: { form: UseFormReturnType<MeetingUpdate> }) {
  const { form } = props
  const loading = useRecoilValue(meetingUpdateLoadingState)

  return (
    <Paper p={20} radius="lg" >
      <Title order={5}>Meeting Information</Title>
      <Divider variant="dotted" my="md" />
      <TextInput
        my="sm"
        label="Meeting Name"
        description="Meeting Name or Agenda of Meeting" placeholder="Input Agenda"
        disabled={loading}
        {...form.getInputProps('name')}
      />
      <Group >
        <DatePicker
          label="Meeting Date"
          placeholder='Pick Date'
          {...form.getInputProps('startDate')}
          disabled={loading}
        />
        <TimeInput
          label="Jam Meeting"
          placeholder='Pick Time'
          icon={<Clock />}
          {...form.getInputProps('startDate')}
          disabled={loading}
        />
      </Group>
      <Group my={"sm"}>
        <NumberInput
          label="Duration (minutes)"
          placeholder='duration in minutes'
          description="Meeting Duration estimation"
          {...form.getInputProps('duration')}
          disabled={loading}
        />
      </Group>
    </Paper>
  )
}
