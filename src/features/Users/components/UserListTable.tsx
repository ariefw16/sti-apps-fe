import {
  ScrollArea,
  Button,
  Table,
  Checkbox,
  Menu,
  createStyles,
} from "@mantine/core";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChevronDown, Pencil, Trash } from "tabler-icons-react";
import {
  userDeleteState,
  userListState,
  userUpdateState,
} from "../../../stores/user.store";
import { DataToDelete } from "../../../types/common";
import { UserUpdateData } from "../../../types/user.type";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function UserListTable() {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<number[]>([]);
  const user = useRecoilValue(userListState);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const setDataDeletion = useSetRecoilState(userDeleteState);
  const setDataUpdate = useSetRecoilState(userUpdateState);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === user.length ? [] : user.map((item) => item.id!)
    );
  const deleteButtonHandler = (data: DataToDelete) => {
    setDataDeletion({ showModal: true, data });
  };
  const editButtonHandler = (data: UserUpdateData) => {
    setDataUpdate({ showModal: true, data });
  };

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === user.length}
                indeterminate={
                  selection.length > 0 && selection.length !== user.length
                }
                transitionDuration={0}
              />
            </th>
            <th style={rowHeaderStyle}>Name</th>
            <th style={rowHeaderStyle}>NIK</th>
            <th style={rowHeaderStyle}>Email</th>
            <th style={rowHeaderStyle}>Unit</th>
            <th style={{ width: 120, ...rowHeaderStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((item) => {
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
                <td>{item.nik}</td>
                <td>{item.email}</td>
                <td>{item.unit?.name}</td>
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
