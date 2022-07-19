import { Button, Group, Paper } from "@mantine/core"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Pencil } from "tabler-icons-react"

export default function DetailMeetingButtonGroup() {
  const navigate = useNavigate()
  const { id } = useParams()

  const backButtonHandler = () => {
    navigate(`/meetings`)
  }
  const updateButtonHandler = () => {
    navigate(`/meetings/${id}/edit`)
  }

  return (
    <Paper p={20} radius="lg">
      <Group position="apart">
        <Button onClick={backButtonHandler} color="orange" leftIcon={<ArrowLeft />} radius="md">Back</Button>
        <Button rightIcon={<Pencil />} onClick={updateButtonHandler} radius={"md"}>Update</Button>
      </Group>
    </Paper>
  )
}
