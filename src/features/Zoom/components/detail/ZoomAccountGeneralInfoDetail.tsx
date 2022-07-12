import { Checkbox, Divider, Paper, TextInput, Title, Group, Button } from "@mantine/core";
import { ArrowLeft, Pencil, Trash } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { zoomAccountDeleteState, zoomAccountDetailState } from "../../utils/store";

export default function ZoomAccountGeneralInfoDetail() {
  const navigate = useNavigate()
  const account = useRecoilValue(zoomAccountDetailState)
  const setDeletion = useSetRecoilState(zoomAccountDeleteState)

  const backButtonHandler = () => {
    navigate(-1)
  }
  const deleteButtonHandler = () => {
    setDeletion({ showModal: true, data: { id: account.id!, name: account.name! } })
  }
  const updateButtonHandler = () => {
    navigate(`/zoom-account/${account.id}/edit`)
  }

  return <Paper p={20} radius="lg">
    <Title order={5}>General Information</Title>
    <Divider my="md" variant="dotted" />
    <TextInput my="sm" label="Zoom Account Name" description="Zoom Account Title / Description"
      value={account.name || ''}
      readOnly
    />
    <TextInput my="sm" label="Unit" description="Select unit where this acount belongs To"
      readOnly
      value={account.ownerUnit?.name || ''}
    />
    <Checkbox
      onChange={() => { }}
      checked={account.active || false}
      label="Account Zoom is Active ? "
      readOnly
      my={"md"} />
    <Divider my="md" variant="dotted" />
    <Group position="apart">
      <Button onClick={backButtonHandler} color="orange" leftIcon={<ArrowLeft />} radius="md">Back</Button>
      <Group>
        <Button rightIcon={<Trash />} color="red" radius={"md"} onClick={deleteButtonHandler}>Delete</Button>
        <Button rightIcon={<Pencil />} radius={"md"} onClick={updateButtonHandler}>Update</Button>
      </Group>
    </Group>
  </Paper>
}
