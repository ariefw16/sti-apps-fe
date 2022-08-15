import {
  Button,
  Divider,
  Group,
  Menu,
  Paper,
  Table,
  Title,
} from "@mantine/core";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ChevronDown, Pencil, Plus, Trash } from "tabler-icons-react";
import {
  deviceTemplateDevsCreateModalState,
  deviceTemplateDevsCreateState,
} from "../../utils/store";
import DevsAddModal from "./DevsAddModal";

export default function DeviceTemplateDevsCreate() {
  const [data, setData] = useRecoilState(deviceTemplateDevsCreateState);
  const setCreateModal = useSetRecoilState(deviceTemplateDevsCreateModalState);

  return (
    <>
      <Paper p={20} radius="lg">
        <Group position="apart">
          <Title order={5}>Devices</Title>
          <Button
            leftIcon={<Plus />}
            radius="lg"
            variant="light"
            color={"cyan"}
            onClick={() => {
              setCreateModal(true);
            }}
          >
            Add Device
          </Button>
        </Group>
        <Divider my={"md"} variant="dotted" />
        <Table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Is Spare</th>
              <th>Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr>
                <td>{d.serialNumber}</td>
                <td>{d.isSpare}</td>
                <td>{d.unitName}</td>
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
                    <Menu.Item icon={<Pencil size={14} />} onClick={() => {}}>
                      Update
                    </Menu.Item>
                    <Menu.Item
                      icon={<Trash size={14} />}
                      color="red"
                      onClick={() => {}}
                    >
                      Delete
                    </Menu.Item>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
      <DevsAddModal />
    </>
  );
}
