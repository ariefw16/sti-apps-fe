import { Button, Group, Paper } from "@mantine/core"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { ArrowLeft, DeviceFloppy, X } from "tabler-icons-react"
import { meetingUpdateLoadingState } from "../../utils/store"

export default function EditMeetingButtonGroup() {
  const navigate = useNavigate()
  const { id } = useParams()
  const loading = useRecoilValue(meetingUpdateLoadingState)

  const backButtonHandler = () => {
    navigate(`/meetings/${id}`)
  }
  return (
    <Paper p={20} radius="lg">
      <Group position="apart">
        <Button onClick={backButtonHandler} loading={loading} color="red" variant="light" leftIcon={<X />} radius="md">Cancel</Button>
        <Button rightIcon={<DeviceFloppy />} type="submit" loading={loading} radius={"md"}>Save</Button>
      </Group>
    </Paper>
  )
}
