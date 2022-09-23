import {
  Button,
  Divider,
  Group,
  Menu,
  Paper,
  Table,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { AntennaBars1, Pencil, Plus, Trash } from "tabler-icons-react";
import { inspectionTemplateState } from "../../utils/store";
import AddChecklistInspectionModal from "./AddChecklistModal";

export default function InspectionTemplateLineDetail() {
  const data = useRecoilValue(inspectionTemplateState);
  const [openAdd, setOpenAdd] = useState(false);

  const closeAddModal = () => {
    setOpenAdd(false);
  };

  return (
    <>
      <Paper radius="lg" p="lg">
        <Group position="apart">
          <Title order={5}>Checklist</Title>
          <Button
            size="xs"
            variant="outline"
            leftIcon={<Plus />}
            px={10}
            onClick={() => {
              setOpenAdd(true);
            }}
          >
            Add Checklist
          </Button>
        </Group>
        <Divider my="md" variant="dotted" />
        <Table>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>No.</th>
              <th style={{ width: "50%" }}>Item</th>
              <th>Input Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.DeviceInspectionTemplateDetail?.map((d, idx) => (
              <tr key={d.id}>
                <td>{idx + 1}</td>
                <td>{d.name}</td>
                <td>{d.inputType}</td>
                <td>
                  <Menu
                    control={
                      <Button size="xs" variant="subtle" p={2} radius="md">
                        <AntennaBars1 />
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
                        // deleteButtonHandler({ id: item.id!, name: item.name! });
                      }}
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
      <AddChecklistInspectionModal onClose={closeAddModal} opened={openAdd} />
    </>
  );
}
