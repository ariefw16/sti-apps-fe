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
import {
  unitDeleteModalState,
  unitEditModalState,
  unitListState,
} from "../../../stores/unit.store";
import { ChevronDown, Pencil, Trash } from "tabler-icons-react";
import { DataToDelete } from "../../../types/common";
import { Unit } from "../../../types/unit.type";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export function UnitTable() {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<number[]>([]);
  const unit = useRecoilValue(unitListState);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const setDataDeletion = useSetRecoilState(unitDeleteModalState);
  const setEdit = useSetRecoilState(unitEditModalState);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === unit.length ? [] : unit.map((item) => item.id!)
    );
  const deleteButtonHandler = (data: DataToDelete) => {
    setDataDeletion({ showModal: true, data });
  };
  const editButtonHandler = (data: Unit) => {
    setEdit({ showModal: true, data: { ...data, name: data.name! } });
  };

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === unit.length}
                indeterminate={
                  selection.length > 0 && selection.length !== unit.length
                }
                transitionDuration={0}
              />
            </th>
            <th style={rowHeaderStyle}>Unit</th>
            <th style={rowHeaderStyle}>Parent</th>
            <th style={{ width: 120, ...rowHeaderStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {unit.map((item) => {
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
                <td>{item.parent?.name}</td>
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
