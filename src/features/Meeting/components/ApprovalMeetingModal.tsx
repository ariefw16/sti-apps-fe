import { Select, Button, Modal, Group, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { meetingApprovalState, meetingListFilterState } from "../utils/store";
import { SelectOptions } from "../../../types/common";
import { fetchZoomAccount } from "../../Zoom/utils/service";
import moment from "moment";
import { approveMeeting } from "../utils/service";

export default function ApprovalMeetingModal() {
  const [approval, setApproval] = useRecoilState(meetingApprovalState)
  const resetApproval = useResetRecoilState(meetingApprovalState)
  const setFilter = useSetRecoilState(meetingListFilterState)
  const [loading, setLoading] = useState(false)
  const [accountSelection, setAccountSelection] = useState<SelectOptions[]>([])
  const [accountError, setAccountError] = useState(false)

  useEffect(() => {
    fetchZoomAccount({})
      .then(res => {
        setAccountSelection(res.data.map(r => ({ label: r.name!, value: r.id!.toString() })))
      })
      .catch(e => {
        showNotification({ title: 'Fetch Zoom Account', message: `Error! ${e.message}`, color: 'red' })
      })
  }, [])

  const onSubmit = () => {
    if (!approval.data.zoomAccountId || approval.data.zoomAccountId === null || approval.data.zoomAccountId === '') {
      setAccountError(true)
      showNotification({ title: 'Meeting Approval', message: `Please select Zoom Account to Approve`, color: 'red' })
    }
    else {
      setLoading(true)
      approveMeeting({ id: approval.data.id!, zoomAccountId: approval.data.zoomAccountId! })
        .then(() => {
          setFilter(f => ({ ...f, refreshToggle: !f.refreshToggle }))
          showNotification({ title: 'Meeting Approval', message: `Meeting approval success! Check Join Url`, color: 'green' })
          resetApproval()
        })
        .catch(e => {
          showNotification({ title: 'Meeting Approval', message: `Error! ${e.message}`, color: 'red' })
        })
        .finally(() => { setLoading(false) })
    }
  }
  const accountSelectHandler = (vals: string) => {
    setAccountError(false)
    setApproval(a => ({ ...a, data: { ...a.data, zoomAccountId: vals } }))
  }

  return (
    <Modal
      onClose={resetApproval}
      opened={approval.showModal}
      withCloseButton={false}
      closeOnEscape={loading}
      closeOnClickOutside={loading}
      title="Meeting Approval"
    >
      <TextInput
        my="sm"
        label="Meeting Name"
        description="Meeting Name or Agenda of Meeting" placeholder="Input Agenda"
        readOnly
        variant="filled"
        value={approval.data.name || ''}
      />
      <Group my={"sm"}>
        <TextInput
          my="sm"
          label="Meeting Time"
          description="Meeting Name or Agenda of Meeting"
          readOnly
          variant="filled"
          value={moment(approval.data.startDate).format('ddd, DD-MMM-YYYY (HH:mm)') || ''}
        />
        <TextInput
          label="Duration (minutes)"
          placeholder='duration in minutes'
          description="Meeting Duration estimation"
          readOnly
          variant="filled"
          value={approval.data.duration || ''}
        />
      </Group>
      <Select
        data={accountSelection || []}
        placeholder="Select Options"
        description="Assign Zoom Account to this meeting"
        label="Zoom Account"
        radius="md"
        variant="filled"
        onChange={accountSelectHandler}
        value={approval.data.zoomAccountId?.toString()}
        disabled={loading}
        error={accountError}
      />
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
