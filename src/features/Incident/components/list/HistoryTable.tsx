import {
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
import { ChevronDown, Eye, ListDetails } from "tabler-icons-react";
import {
  activityListModalState,
  HistoryIncidentListState,
} from "../../utils/store";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function HistoryIncidentListTable() {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<number[]>([]);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const incident = useRecoilValue(HistoryIncidentListState);
  const navigate = useNavigate();
  const setActivityList = useSetRecoilState(activityListModalState);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === incident.length ? [] : incident.map((item) => item.id!)
    );

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === incident.length}
                indeterminate={
                  selection.length > 0 && selection.length !== incident.length
                }
                transitionDuration={0}
              />
            </th>
            <th style={rowHeaderStyle}>Unit</th>
            <th style={rowHeaderStyle}>Device</th>
            <th style={rowHeaderStyle}>Down At</th>
            <th style={{ width: 120, ...rowHeaderStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incident.map((item) => {
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
                <td>{item.unit?.name}</td>
                <td>
                  {item.device?.name} ( {item.device?.ipAddress} )
                </td>
                <td>
                  {moment(item.eventDate).format("ddd, DD-MMM-YYYY (HH:mm)")}
                </td>
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
                        navigate(`/incident/${item.id}`);
                      }}
                    >
                      View
                    </Menu.Item>
                    <Menu.Item
                      icon={<ListDetails size={14} />}
                      onClick={() => {
                        setActivityList({
                          showModal: true,
                          incidentId: item.id,
                        });
                      }}
                    >
                      View Activity List
                    </Menu.Item>
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
