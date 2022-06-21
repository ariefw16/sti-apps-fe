import {
  Badge,
  Button,
  Checkbox,
  createStyles,
  Menu,
  ScrollArea,
  Table,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  AlertTriangle,
  Check,
  ChevronDown,
  Eye,
  ListDetails,
  Plus,
} from "tabler-icons-react";
import { updateIncident } from "../../utils/service";
import {
  activityListModalState,
  incidentActivityCreationState,
  incidentListFilterState,
  incidentListState,
} from "../../utils/store";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function IncidentsTable() {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<number[]>([]);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const incident = useRecoilValue(incidentListState);
  const navigate = useNavigate();
  const setFilter = useSetRecoilState(incidentListFilterState);
  const setActivityCreation = useSetRecoilState(incidentActivityCreationState);
  const setActivityList = useSetRecoilState(activityListModalState);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () => {
    setSelection((current) =>
      current.length === incident.length ? [] : incident.map((item) => item.id!)
    );
  };
  const setDoneHandler = (id: number) => {
    updateIncident(id, { isDone: true })
      .then(() => {
        showNotification({
          title: "Updation Incident",
          message: `Update incident to Done success!`,
          color: "green",
        });
        setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
      })
      .catch((e) => {
        showNotification({
          title: "Updation Incident",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };
  const setNotDoneHandler = (id: number) => {
    updateIncident(id, { isDone: false })
      .then(() => {
        showNotification({
          title: "Updation Incident",
          message: `Update incident to Not Done success!`,
          color: "green",
        });
        setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
      })
      .catch((e) => {
        showNotification({
          title: "Updation Incident",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

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
            <th style={rowHeaderStyle}>Status</th>
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
                  {item.isDone ? (
                    <Badge color="teal">Done</Badge>
                  ) : (
                    <Badge color="red">Not Done</Badge>
                  )}
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
                    <Menu.Item
                      icon={<Plus size={14} />}
                      onClick={() => {
                        setActivityCreation({
                          showModal: true,
                          data: { incidentId: item.id, incident: item },
                        });
                      }}
                    >
                      Add Activity
                    </Menu.Item>
                    {item.isDone ? (
                      <Menu.Item
                        icon={<AlertTriangle size={14} />}
                        color="red"
                        onClick={() => {
                          setNotDoneHandler(item.id!);
                        }}
                      >
                        Set Not Done
                      </Menu.Item>
                    ) : (
                      <Menu.Item
                        icon={<Check size={14} />}
                        color="green"
                        onClick={() => {
                          setDoneHandler(item.id!);
                        }}
                      >
                        Set Done
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
