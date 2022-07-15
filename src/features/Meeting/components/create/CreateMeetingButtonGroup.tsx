import { Button, Group, Paper } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { DeviceFloppy, ArrowLeft } from "tabler-icons-react"
import { meetingCreateLoadingState } from "../../utils/store"

export default function CreateMeetingButtonGroup() {
  const navigate = useNavigate()
  const loading = useRecoilValue(meetingCreateLoadingState)

  const backButtonHandler = () => {
    navigate('/meetings')
  }
  return (
    <Paper p={20} radius="lg">
      <Group position="apart">
        <Button onClick={backButtonHandler} loading={loading} color="orange" leftIcon={<ArrowLeft />} radius="md">Back</Button>
        <Button rightIcon={<DeviceFloppy />} type="submit" loading={loading} radius={"md"}>Save</Button>
      </Group>
    </Paper>
  )
}
