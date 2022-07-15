import { Button, Title, Modal, Group } from "@mantine/core";
import { useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { meetingApprovalState } from "../utils/store";
import { CircleCheck } from 'tabler-icons-react'

export default function ApprovalMeetingModal() {
  const approval = useRecoilValue(meetingApprovalState)
  const resetApproval = useResetRecoilState(meetingApprovalState)
  const [loading, setLoading] = useState(false)

  const onSubmit = () => { }

  return (
    <Modal
      onClose={resetApproval}
      opened={approval.showModal}
      withCloseButton={false}
      closeOnEscape={loading}
      closeOnClickOutside={loading}
    >
      <Group position="center">
        <CircleCheck size={150} color="green" />
      </Group>
      <Group position="center" mb={30}>
        <Title order={6} sx={(theme) => ({ fontFamily: theme.fontFamily })}>
          Are you sure to Approve Meeting Agenda <i>( {approval.data.name} )</i> ?
        </Title>
      </Group>
      <Group position="center" sx={{ marginTop: 30 }}>
        <Button color="green" onClick={onSubmit} loading={loading}>
          Yes, Approve it
        </Button>
        <Button variant="light" color={"orange"} loading={loading} onClick={resetApproval}>
          No! Go Back!
        </Button>
      </Group>
    </Modal>
  )
}
