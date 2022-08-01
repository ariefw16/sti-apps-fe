import { useState } from "react";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Menu,
  Button,
} from "@mantine/core";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChevronDown, Pencil, Trash, Users } from "tabler-icons-react";
import { DataToDelete } from "../../../../types/common";
import {
  groupDeleteState,
  groupListState,
  groupManageMemberState,
  groupUpdateState,
} from "../../utils/store";
import { Group } from "../../utils/type";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export function GroupListTable() {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<number[]>([]);
  const group = useRecoilValue(groupListState);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const setDeletion = useSetRecoilState(groupDeleteState);
  const setUpdate = useSetRecoilState(groupUpdateState);
  const setManageMember = useSetRecoilState(groupManageMemberState);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === group.length ? [] : group.map((item) => item.id!)
    );
  const deleteButtonHandler = (data: DataToDelete) => {
    setDeletion({ showModal: true, data });
  };
  const editButtonHandler = (data: Group) => {
    setUpdate({ showModal: true, data });
  };
  const manageButtonHandler = (id: number) => {
    setManageMember({ showModal: true, id });
  };

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === group.length}
                indeterminate={
                  selection.length > 0 && selection.length !== group.length
                }
                transitionDuration={0}
              />
            </th>
            <th style={rowHeaderStyle}>Group Name</th>
            <th style={rowHeaderStyle}>Total Members</th>
            <th style={{ width: 120, ...rowHeaderStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {group.map((item) => {
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
                <td style={{ width: "50%" }}>{item.name}</td>
                <td>{item._count?.users}</td>
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
                      icon={<Users size={14} />}
                      onClick={() => {
                        manageButtonHandler(item.id!);
                      }}
                    >
                      Manage Members
                    </Menu.Item>
                    <Menu.Item
                      icon={<Pencil size={14} />}
                      onClick={() => {
                        editButtonHandler(item);
                      }}
                    >
                      Update
                    </Menu.Item>
                    <Menu.Item
                      icon={<Trash size={14} />}
                      color="red"
                      onClick={() => {
                        deleteButtonHandler({ id: item.id!, name: item.name! });
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
