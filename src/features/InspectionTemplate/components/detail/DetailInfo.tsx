import {
  Button,
  Divider,
  Group,
  Menu,
  Paper,
  Table,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AntennaBars1, Pencil, Plus, Trash } from "tabler-icons-react";
import DeleteDialog from "../../../../components/common/DeleteDialog";
import { DataToDelete } from "../../../../types/common";
import { deleteInspectionTemplateDetail } from "../../utils/service";
import {
  inspectionTemplateState,
  inspectionTemplateTriggerState,
} from "../../utils/store";
import { InspectionTemplateDetail } from "../../utils/type";
import UpdateInspectionTemplateChecklistModal from "../updateChecklistModal";
import AddChecklistInspectionModal from "./AddChecklistModal";

export default function InspectionTemplateLineDetail() {
  const data = useRecoilValue(inspectionTemplateState);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<InspectionTemplateDetail>({});
  const [deletion, setDeletion] = useState(false);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [deletionData, setDeletionData] = useState<DataToDelete>({
    id: 0,
    name: "",
  });
  const setTrigger = useSetRecoilState(inspectionTemplateTriggerState);

  const closeAddModal = () => {
    setOpenAdd(false);
  };
  const closeUpdateModal = () => {
    setOpenUpdate(false);
  };
  const deleteButtonHandler = (data: DataToDelete) => {
    setDeletionData(data);
    setDeletion(true);
  };
  const deletionSubmitHandler = () => {
    setDeletionLoading(true);
    deleteInspectionTemplateDetail(deletionData.id)
      .then(() => {
        setTrigger((t) => !t);
        hideDeleteion();
        showNotification({
          title: "Inspection Checklist Deletion",
          message: "Inspection Checklist deleted successfully!",
          color: "green",
        });
      })
      .catch((e) => {
        showNotification({
          title: "Inspection Checklist Deletion",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setDeletionLoading(false);
      });
  };
  const hideDeleteion = () => {
    setDeletion(false);
    setDeletionData({ id: 0, name: "" });
  };
  const editButtonHandler = (data: InspectionTemplateDetail) => {
    setDataUpdate(data);
    setOpenUpdate(true);
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
                        editButtonHandler(d);
                      }}
                    >
                      Update
                    </Menu.Item>
                    <Menu.Item
                      icon={<Trash size={14} />}
                      color="red"
                      onClick={() => {
                        deleteButtonHandler({ id: d.id!, name: d.name! });
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
      <DeleteDialog
        open={deletion}
        data={deletionData}
        onClose={hideDeleteion}
        onSubmit={deletionSubmitHandler}
        loading={deletionLoading}
      />
      <UpdateInspectionTemplateChecklistModal
        opened={openUpdate}
        onClose={closeUpdateModal}
        data={dataUpdate}
      />
    </>
  );
}
