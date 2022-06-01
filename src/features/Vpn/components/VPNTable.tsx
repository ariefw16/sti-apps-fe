import {
  Table,
  Checkbox,
  Menu,
  ScrollArea,
  Button,
  createStyles,
} from "@mantine/core";
import moment from "moment";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChevronDown, CodePlus, Pencil, Trash } from "tabler-icons-react";
import {
  vpnDeleteState,
  vpnExtendState,
  vpnListState,
  vpnUpdateState,
} from "../../../stores/vpn.store";
import { DataToDelete } from "../../../types/common";
import { VPN } from "../../../types/vpn.type";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function VPNTable() {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<number[]>([]);
  const vpn = useRecoilValue(vpnListState);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const setExtends = useSetRecoilState(vpnExtendState);
  const setDeletion = useSetRecoilState(vpnDeleteState);
  const setDataUpdate = useSetRecoilState(vpnUpdateState);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === vpn.length ? [] : vpn.map((item) => item.id!)
    );
  const deleteButtonHandler = (data: DataToDelete) => {
    setDeletion({ showModal: true, data });
  };
  const editButtonHandler = (data: VPN) => {
    setDataUpdate({ showModal: true, data });
  };
  const extendButtonHandler = (data: VPN) => {
    setExtends({ showModal: true, data });
  };

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === vpn.length}
                indeterminate={
                  selection.length > 0 && selection.length !== vpn.length
                }
                transitionDuration={0}
              />
            </th>
            <th style={rowHeaderStyle}>Name</th>
            <th style={rowHeaderStyle}>NIK</th>
            <th style={rowHeaderStyle}>Username</th>
            <th style={rowHeaderStyle}>Expired at</th>
            <th style={{ width: 120, ...rowHeaderStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vpn.map((item) => {
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
                <td>{item.user?.name}</td>
                <td>{item.user?.nik}</td>
                <td>{item.username}</td>
                <td>
                  {moment(item.expiredDate).format("ddd, DD-MMM-YYYY (HH:mm)")}
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
                      icon={<CodePlus size={14} />}
                      onClick={() => {
                        extendButtonHandler(item);
                      }}
                    >
                      Extend Duration
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
                          name: item.user?.name!,
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
