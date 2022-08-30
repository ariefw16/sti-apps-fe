import {
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
import { ChevronDown, Eye, Trash } from "tabler-icons-react";
import { DataToDelete } from "../../../../types/common";
import {
  deviceTemplateDeletionState,
  deviceTemplateListState,
} from "../../utils/store";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function DeviceTemplateTable() {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<number[]>([]);
  const setDeletion = useSetRecoilState(deviceTemplateDeletionState);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const template = useRecoilValue(deviceTemplateListState);
  const navigate = useNavigate();

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === template.length ? [] : template.map((item) => item.id!)
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
                checked={selection.length === template.length}
                indeterminate={
                  selection.length > 0 && selection.length !== template.length
                }
                transitionDuration={0}
              />
            </th>
            <th style={rowHeaderStyle}>Name</th>
            <th style={rowHeaderStyle}>Merk</th>
            <th style={rowHeaderStyle}>Type</th>
            <th style={rowHeaderStyle}>Devices</th>
            <th style={{ width: 120, ...rowHeaderStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {template.map((item) => {
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
                <td>{item.merk}</td>
                <td>{item.deviceType?.name}</td>
                <td>{item._count?.devices}</td>
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
                        navigate(`/device-template/${item.id}`);
                      }}
                    >
                      View
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
