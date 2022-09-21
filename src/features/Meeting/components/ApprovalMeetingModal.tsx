import {
  Select,
  Button,
  Modal,
  Group,
  TextInput,
  Table,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { meetingApprovalState, meetingListFilterState } from "../utils/store";
import { SelectOptions } from "../../../types/common";
import { fetchZoomAccount } from "../../Zoom/utils/service";
import moment from "moment";
import { approveMeeting, fetchMeeting } from "../utils/service";
import { Meeting } from "../utils/type";

export default function ApprovalMeetingModal() {
  const [approval, setApproval] = useRecoilState(meetingApprovalState);
  const resetApproval = useResetRecoilState(meetingApprovalState);
  const setFilter = useSetRecoilState(meetingListFilterState);
  const [loading, setLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(false);
  const [accountSelection, setAccountSelection] = useState<SelectOptions[]>([]);
  const [accountError, setAccountError] = useState(false);
  const [schedule, setSchedule] = useState<Meeting[]>([]);

  useEffect(() => {
    fetchZoomAccount({})
      .then((res) => {
        setAccountSelection(
          res.data.map((r) => ({
            label: `${r.name} (${r.maxParticipant} participants) `,
            value: r.id!.toString(),
            group: r.useApi ? "API Connected" : "Non API Account",
          }))
        );
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Zoom Account",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  }, []);
  useEffect(() => {
    //reset Schedule useState
    setSchedule([]);
  }, [approval.showModal]);

  const onSubmit = () => {
    if (
      !approval.data.zoomAccountId ||
      approval.data.zoomAccountId === null ||
      approval.data.zoomAccountId === ""
    ) {
      setAccountError(true);
      showNotification({
        title: "Meeting Approval",
        message: `Please select Zoom Account to Approve`,
        color: "red",
      });
    } else {
      setLoading(true);
      approveMeeting({
        id: approval.data.id!,
        zoomAccountId: approval.data.zoomAccountId!,
      })
        .then(() => {
          setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
          showNotification({
            title: "Meeting Approval",
            message: `Meeting approval success! Check Join Url`,
            color: "green",
          });
          resetApproval();
        })
        .catch((e) => {
          showNotification({
            title: "Meeting Approval",
            message: `Error! ${e.message}`,
            color: "red",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const accountSelectHandler = (vals: string) => {
    setAccountError(false);
    setApproval((a) => ({ ...a, data: { ...a.data, zoomAccountId: vals } }));
    setAccountLoading(true);
    fetchMeeting({ zoomAccountId: vals })
      .then((res) => {
        setSchedule(res.data);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Meeting Schedule",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setAccountLoading(false);
      });
  };

  return (
    <Modal
      onClose={resetApproval}
      opened={approval.showModal}
      withCloseButton={false}
      closeOnEscape={loading}
      closeOnClickOutside={loading}
      title="Meeting Approval"
      size={"xl"}
    >
      <TextInput
        my="sm"
        label="Meeting Name"
        description="Meeting Name or Agenda of Meeting"
        placeholder="Input Agenda"
        readOnly
        variant="filled"
        value={approval.data.name || ""}
      />
      <Group my={"sm"}>
        <TextInput
          my="sm"
          label="Meeting Time"
          description="Meeting Name or Agenda of Meeting"
          readOnly
          variant="filled"
          value={
            moment(approval.data.startDate).format(
              "ddd, DD-MMM-YYYY (HH:mm)"
            ) || ""
          }
        />
        <TextInput
          label="Duration (minutes)"
          placeholder="duration in minutes"
          description="Meeting Duration estimation"
          readOnly
          variant="filled"
          value={approval.data.duration || ""}
        />
      </Group>
      <TextInput
        my="sm"
        label="Expected Participant"
        description="Participant to attend Meeting"
        readOnly
        variant="filled"
        value={approval.data.expectedParticipant + " participants" || ""}
      />
      <TextInput
        my="sm"
        label="Requested By"
        description="Requestor Name and email"
        readOnly
        variant="filled"
        value={
          `${approval.data.requestorName} ( ${approval.data.requestorEmail})` ||
          ""
        }
      />
      <Select
        data={accountSelection || []}
        placeholder="Select Options"
        description="Assign Zoom Account to this meeting"
        label="Zoom Account"
        radius="md"
        onChange={accountSelectHandler}
        value={approval.data.zoomAccountId?.toString()}
        disabled={loading}
        error={accountError}
        my="md"
      />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={accountLoading} />
        <Table>
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Agenda</th>
              <th style={{ width: "20%" }}>Start time</th>
              <th style={{ width: "15%" }}>Duration</th>
              <th style={{ width: "25%" }}>Requested By</th>
            </tr>
          </thead>
          <tbody>
            {schedule.length < 1 ? (
              <tr>
                <td colSpan={4} align="center">
                  <i>No Schedule Found</i>
                </td>
              </tr>
            ) : (
              schedule.map((s, idx) => (
                <tr key={idx}>
                  <td>{s.name}</td>
                  <td>{moment(s.startDate).format("HH:mm")}</td>
                  <td>{s.duration} minutes</td>
                  <td>{s.requestorName}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Box>
      <Group position="center" sx={{ marginTop: 30 }}>
        <Button color="green" onClick={onSubmit} loading={loading}>
          Yes, Approve it
        </Button>
        <Button
          variant="light"
          color={"orange"}
          loading={loading}
          onClick={resetApproval}
        >
          No! Go Back!
        </Button>
      </Group>
    </Modal>
  );
}
