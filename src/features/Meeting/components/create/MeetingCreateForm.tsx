import { Paper, Group, Button, Title, TextInput, Divider } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form/lib/use-form'
import { useState } from 'react'
import { MeetingCreate } from '../../utils/type'
import { ArrowLeft, DeviceFloppy } from "tabler-icons-react";
import { useNavigate } from 'react-router-dom';

export default function MeetingCreateForm(props: { form: UseFormReturnType<MeetingCreate> }) {
  const { form } = props
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const backButtonHandler = () => {
    navigate('/meetings')
  }
  return (
    <Paper p={20} radius="lg" mt={50}>
      <Title order={5}>Meeting Information</Title>
      <Divider variant="dotted" my="md" />
      <TextInput
        my="sm"
        label="Meeting Name"
        description="Meeting Name or Agenda of Meeting" placeholder="Input Agenda"
        disabled={loading}
        {...form.getInputProps('name')}
      />
      <Divider my="md" variant="dotted" />
      <Group position="apart">
        <Button onClick={backButtonHandler} loading={loading} color="orange" leftIcon={<ArrowLeft />} radius="md">Back</Button>
        <Button rightIcon={<DeviceFloppy />} type="submit" loading={loading} radius={"md"}>Save</Button>
      </Group>
    </Paper>
  )
}
