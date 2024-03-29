import {
  zoomAccountDeleteState,
  zoomAccountTestConnectState,
  zoomListState,
} from "../../utils/store";
import {
  Badge,
  Button,
  Checkbox,
  createStyles,
  Menu,
  ScrollArea,
  Table,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  AccessPoint,
  ChevronDown,
  Eye,
  Pencil,
  Trash,
} from "tabler-icons-react";
import { DataToDelete } from "../../../../types/common";
import { ZoomAccount } from "../../utils/type";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function ZoomAccountListTable() {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<number[]>([]);
  const account = useRecoilValue(zoomListState);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const navigate = useNavigate();
  const setDeletion = useSetRecoilState(zoomAccountDeleteState);
  const setConnection = useSetRecoilState(zoomAccountTestConnectState);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === account.length ? [] : account.map((item) => item.id!)
    );

  const deleteButtonHandler = (data: DataToDelete) => {
    setDeletion({ showModal: true, data });
  };
  const editButtonHandler = (data: ZoomAccount) => {
    navigate(`/zoom-account/${data.id}/edit`);
  };

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === account.length}
                indeterminate={
                  selection.length > 0 && selection.length !== account.length
                }
                transitionDuration={0}
              />
            </th>
            <th style={rowHeaderStyle}>Name</th>
            <th style={rowHeaderStyle}>Max Participant</th>
            <th style={rowHeaderStyle}>Use Api</th>
            <th style={{ width: 120, ...rowHeaderStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {account.map((item) => {
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
                <td>{item.maxParticipant} participants</td>
                <td>
                  {item.useApi ? (
                    <Badge color={"green"}>Yes</Badge>
                  ) : (
                    <Badge color={"orange"}>No</Badge>
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
                        navigate(`/zoom-account/${item.id}`);
                      }}
                    >
                      View
                    </Menu.Item>
                    <Menu.Item
                      icon={<Pencil size={14} />}
                      onClick={() => {
                        editButtonHandler(item);
                      }}
                    >
                      Update
                    </Menu.Item>
                    {item.useApi && (
                      <Menu.Item
                        icon={<AccessPoint size={14} />}
                        onClick={() => {
                          setConnection({ showModal: true, id: item.id! });
                        }}
                        color="cyan"
                      >
                        Test Connection
                      </Menu.Item>
                    )}
                    <Menu.Item
                      icon={<Trash size={14} />}
                      color="red"
                      onClick={() => {
                        deleteButtonHandler({
                          id: item.id!,
                          name: item.name!,
                        });
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
  );
}
