import {
  Button,
  Checkbox,
  createStyles,
  Menu,
  ScrollArea,
  Table,
} from "@mantine/core";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChevronDown, CodePlus, Pencil, Trash } from "tabler-icons-react";
import { DataToDelete } from "../../../types/common";
import { deviceDeleteModalState, deviceListState } from "../utils/store";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function DeviceTable() {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<number[]>([]);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const device = useRecoilValue(deviceListState);
  const setDeletion = useSetRecoilState(deviceDeleteModalState);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === device.length ? [] : device.map((item) => item.id!)
    );
  const deleteButtonHandler = (data: DataToDelete) => {
    setDeletion({ showModal: true, data });
  };

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === device.length}
                indeterminate={
                  selection.length > 0 && selection.length !== device.length
                }
                transitionDuration={0}
              />
            </th>
            <th style={rowHeaderStyle}>Name</th>
            <th style={rowHeaderStyle}>Type</th>
            <th style={rowHeaderStyle}>IP Address</th>
            <th style={rowHeaderStyle}>Unit</th>
            <th style={{ width: 120, ...rowHeaderStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {device.map((item) => {
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
                <td>{item.deviceType?.name}</td>
                <td>{item.ipAddress}</td>
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
                        // editButtonHandler(item);
                      }}
                    >
                      Update
                    </Menu.Item>
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
