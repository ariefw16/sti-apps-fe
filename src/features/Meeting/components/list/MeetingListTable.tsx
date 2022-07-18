import {
  Badge,
  Button,
  Checkbox,
  createStyles,
  Menu,
  ScrollArea,
  Table,
} from "@mantine/core";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Check, ChevronDown, Eye, Pencil, Trash, X } from "tabler-icons-react";
import { DataToDelete } from "../../../../types/common";
import { meetingApprovalState, meetingCancelState, meetingDeleteState, meetingListState } from "../../utils/store";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function MeetingListTable() {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<number[]>([]);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const navigate = useNavigate();
  const meeting = useRecoilValue(meetingListState)
  const setDeletion = useSetRecoilState(meetingDeleteState)
  const setApproval = useSetRecoilState(meetingApprovalState)
  const setCancel = useSetRecoilState(meetingCancelState)

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === meeting.length
        ? []
        : meeting.map((item) => item.id!)
    );
  const deleteButtonHandler = (data: DataToDelete) => {
    setDeletion({ showModal: true, data })
  }
  const approvalMenuHandler = (data: { id: number, name: string, startDate: Date, duration: number }) => {
    setApproval({ showModal: true, data })
  }
  const cancelMenuHandler = (data: { id: number, name: string }) => {
    setCancel({ showModal: true, data })
  }

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === meeting.length}
                indeterminate={
                  selection.length > 0 && selection.length !== meeting.length
                }
                transitionDuration={0}
              />
            </th>
            <th style={rowHeaderStyle}>Agenda</th>
            <th style={rowHeaderStyle}>Meeting Time</th>
            <th style={rowHeaderStyle}>Duration</th>
            <th style={rowHeaderStyle}>Account</th>
            <th style={rowHeaderStyle}>Approval Status</th>
            <th style={{ width: 120, ...rowHeaderStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meeting.map((item) => {
            const selected = selection.includes(item.id!);
            return (
              <tr
                key={item.id}
                className={cx({ [classes.rowSelected]: selected })}
              >
                <td>
                  <Checkbox
                    checked={selection.includes(item.id!)}
                    onChange={() => toggleRow(item.id!)}
                    transitionDuration={0}
                  />
                </td>
                <td>{item.name}</td>
                <td>{moment(item.startDate).format('DD-MMM-YYYY HH:mm:ss')}</td>
                <td>{item.duration} min</td>
                <td>{item.zoomAccount?.name || '-'}</td>
                <td>{item.status === 0 ?
                  <Badge variant="filled" color={"orange"}>Waiting approval</Badge>
                  : item.status === 1 ? <Badge>Approved</Badge> : <Badge color={"red"}>Cancelled</Badge>}</td>
                <td>
                  <Menu
                    control={
                      <Button
                        size="xs"
                        variant="light"
                        rightIcon={<ChevronDown size={14} />}
                      >
                        Actions
                      </Button>
                    }
                  >
                    <Menu.Item
                      icon={<Eye size={14} />}
                      onClick={() => {
                        navigate(`/zoom-meeting/${item.id}`);
                      }}
                    >
                      View
                    </Menu.Item>
                    <Menu.Item
                      icon={<Pencil size={14} />}
                      onClick={() => {
                      }}
                    >
                      Update
                    </Menu.Item>
                    {item.status === 1 &&
                      (<Menu.Item
                        icon={<X size={14} />}
                        onClick={() => {
                          cancelMenuHandler({
                            id: item.id!,
                            name: item.name!,
                          })
                        }}
                        color="red"
                      >
                        Cancel Meeting
                      </Menu.Item>)
                    }
                    {item.status === 0 &&
                      <Menu.Item
                        icon={<Check size={14} />}
                        onClick={() => {
                          approvalMenuHandler({
                            id: item.id!,
                            name: item.name!,
                            startDate: item.startDate!,
                            duration: item.duration!
                          })
                        }}
                        color="cyan"
                      >
                        Approve Meeting
                      </Menu.Item>
                    }
                    <Menu.Item
                      icon={<Trash size={14} />}
                      color="red"
                      onClick={() => {
                        deleteButtonHandler({ id: item.id!, name: item.name! })
                      }}
                    >
                      Delete
                    </Menu.Item>
                  </Menu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
