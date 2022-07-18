import { Box, Button, Group, Modal, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { AlertCircle } from "tabler-icons-react";
import { cancelMeeting } from "../utils/service";
import { meetingCancelState, meetingListFilterState } from "../utils/store";

export default function CancelMeetingDialog() {
  const cancel = useRecoilValue(meetingCancelState)
  const resetCancel = useResetRecoilState(meetingCancelState)
  const [loading, setLoading] = useState(false)
  const setFilter = useSetRecoilState(meetingListFilterState)

  const onSubmit = () => {
    setLoading(true)
    cancelMeeting(cancel.data.id!).then(() => {
      setFilter(f => ({ ...f, refreshToggle: !f.refreshToggle }))
      showNotification({ title: 'Meeting Cancellation', message: 'Meeting Cancelled!', color: 'green' })
      resetCancel()
    })
      .catch(e => {
        showNotification({ title: 'Meeting Cancellation', message: `Error! ${e.message}`, color: 'red' })
      })
      .finally(() => { setLoading(false) })
  }

  return (
    <Modal
      opened={cancel.showModal}
      onClose={resetCancel}
      withCloseButton={false}
      closeOnEscape={!loading}
      closeOnClickOutside={!loading}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Group position="center">
          <AlertCircle size={150} color="orange" />
        </Group>
        <Group position="center">
          <Title order={6} sx={(theme) => ({ fontFamily: theme.fontFamily })}>
            Are you sure to Cancel Meeting <i>( {cancel.data.name} )</i> ?
          </Title>
        </Group>
        <Group position="center" sx={{ marginTop: 30 }}>
          <Button color="red" onClick={onSubmit} loading={loading}>
            Yes, Cancel Meeting!
          </Button>
          <Button variant="light" color={"indigo"} loading={loading} onClick={resetCancel}>
            No!
          </Button>
        </Group>
      </Box>
    </Modal>
  );
}
