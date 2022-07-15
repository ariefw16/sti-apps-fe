import { Paper, Group, Title, TextInput, Divider, NumberInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form/lib/use-form'
import { MeetingCreate } from '../../utils/type'
import { Clock } from "tabler-icons-react";
import { useRecoilValue } from 'recoil';
import { meetingCreateLoadingState } from '../../utils/store';
import { DatePicker, TimeInput } from '@mantine/dates';

export default function MeetingCreateForm(props: { form: UseFormReturnType<MeetingCreate> }) {
  const { form } = props
  const loading = useRecoilValue(meetingCreateLoadingState)

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
        <DatePicker label="Meeting Date" placeholder='Pick Date' required />
        <TimeInput label="Jam Meeting" placeholder='Pick Time' icon={<Clock />} />
      </Group>
      <Group my={"sm"}>
        <NumberInput label="Duration (minutes)" placeholder='duration in minutes' description="Meeting Duration estimation" />
      </Group>
    </Paper>
  )
}
