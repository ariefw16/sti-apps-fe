import { Badge, Button, Menu, ScrollArea, Table } from "@mantine/core";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ChevronDown, Eye, Pencil } from "tabler-icons-react";
import { historyMeetingListState } from "../../utils/store";

export default function HistoryMeetingTable() {
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const navigate = useNavigate();
  const meeting = useRecoilValue(historyMeetingListState);

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={rowHeaderStyle}>Agenda</th>
            <th style={rowHeaderStyle}>Meeting Time</th>
            <th style={rowHeaderStyle}>Duration</th>
            <th style={rowHeaderStyle}>Account</th>
            <th style={{ width: 120, ...rowHeaderStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meeting.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{moment(item.startDate).format("DD-MMM-YYYY HH:mm:ss")}</td>
                <td>{item.duration} min</td>
                <td>{item.zoomAccount?.name || "-"}</td>
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
                        navigate(`/meetings/${item.id}`);
                      }}
                    >
                      View
                    </Menu.Item>
                    {item.status === 0 && (
                      <Menu.Item icon={<Pencil size={14} />} onClick={() => {}}>
                        Update
                      </Menu.Item>
                    )}
                  </Menu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
