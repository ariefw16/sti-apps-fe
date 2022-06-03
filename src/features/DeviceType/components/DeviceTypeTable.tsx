import {
  Button,
  Checkbox,
  createStyles,
  Menu,
  ScrollArea,
  Table,
} from "@mantine/core";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { ChevronDown, Eye, Pencil, Trash } from "tabler-icons-react";
import { DataToDelete } from "../../../types/common";
import { deviceTypeListState } from "../utils/store";
import { DeviceType } from "../utils/type";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function DeviceTypeTable() {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<number[]>([]);
  const deviceType = useRecoilValue(deviceTypeListState);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  // const setDeletion = useSetRecoilState(vpnDeleteState);
  // const setDataUpdate = useSetRecoilState(vpnUpdateState);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === deviceType.length
        ? []
        : deviceType.map((item) => item.id!)
    );
  const deleteButtonHandler = (data: DataToDelete) => {
    //   setDeletion({ showModal: true, data });
  };
  const editButtonHandler = (data: DeviceType) => {
    //   setDataUpdate({ showModal: true, data });
  };

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === deviceType.length}
                indeterminate={
                  selection.length > 0 && selection.length !== deviceType.length
                }
                transitionDuration={0}
              />
            </th>
            <th style={rowHeaderStyle}>Name</th>
            <th style={{ width: 120, ...rowHeaderStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deviceType.map((item) => {
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
                    <Menu.Item icon={<Eye size={14} />} onClick={() => {}}>
                      View
                    </Menu.Item>
                    <Menu.Item icon={<Eye size={14} />} onClick={() => {}}>
                      Specification Detail
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
