import {
  Paper,
  Title,
  Divider,
  Table,
  Badge,
  Menu,
  Button,
  Group,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { ChevronDown, Eye, Pencil, Plus, Trash } from "tabler-icons-react";
import DeleteDialog from "../../../../components/common/DeleteDialog";
import { DataToDelete, SelectOptions } from "../../../../types/common";
import { deleteDevice } from "../../../Devices/utils/service";
import { Device } from "../../../Devices/utils/type";
import { addDeviceToDeviceTemplate } from "../../utils/service";
import {
  deviceTemplateDetailState,
  deviceTemplateDevsCreateModalState,
  deviceTemplateQuickUpdateDeviceState,
  deviceTemplateQuickUpdateTriggreState,
  deviceTemplateRemoveDeviceState,
} from "../../utils/store";
import DevsAddModal from "../create/DevsAddModal";

export default function DeviceTemplateDevicesDetail(props: {
  unitOptions: SelectOptions[];
}) {
  const { unitOptions } = props;
  const template = useRecoilValue(deviceTemplateDetailState);
  const navigate = useNavigate();
  const setQuickUpdate = useSetRecoilState(
    deviceTemplateQuickUpdateDeviceState
  );
  const setCreateModal = useSetRecoilState(deviceTemplateDevsCreateModalState);
  const setTrigger = useSetRecoilState(deviceTemplateQuickUpdateTriggreState);
  const [deviceDeletion, setDeviceDeletion] = useState<DataToDelete>({
    id: 0,
    name: "",
  });
  const [showDeletion, setShowDeletion] = useState(false);
  const [deletionLoading, setDeletionLoading] = useState(false);

  const updateMenuHandler = (data: Device) => {
    setQuickUpdate({
      showModal: true,
      data,
    });
  };
  const saveButtonHandler = (props: {
    sn: string;
    unitId: string | null;
    isSpare: string | null;
  }) => {
    const { sn, unitId, isSpare } = props;
    addDeviceToDeviceTemplate(template.id!, {
      serialNumber: sn,
      isSpare: isSpare === "1",
      unitId,
    })
      .then(() => {
        showNotification({
          title: "Add Device",
          message: "Device Added Succesfully",
          color: "green",
        });
        setTrigger((t) => !t);
      })
      .catch((e) => {
        showNotification({
          title: "Add Device",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

  const deletionDeviceHandler = () => {
    setDeletionLoading(true);
    deleteDevice(deviceDeletion.id)
      .then(() => {
        showNotification({
          title: "Remove Device from Template",
          message: "Device Removal success!",
          color: "green",
        });
        setTrigger((t) => !t);
        closeModalHandler();
      })
      .catch((e) => {
        showNotification({
          title: "Remove Device from Template",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setDeletionLoading(false);
      });
  };
  const closeModalHandler = () => {
    setShowDeletion(false);
    setDeviceDeletion({ id: 0, name: "" });
  };
  const deleteButtonHandler = (data: DataToDelete) => {
    setDeviceDeletion(data);
    setShowDeletion(true);
  };

  return (
    <>
      <Paper mt={20} p={20} radius="lg">
        <Group position="apart">
          <Title order={5}>Devices List</Title>
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
              <th>is Spare</th>
              <th>Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {template.devices &&
              template.devices.map((d) => (
                <tr key={d.id}>
                  <td>{d.serialNumber}</td>
                  <td>
                    {d.isSpare ? (
                      <Badge color={"orange"}>Spare</Badge>
                    ) : (
                      <Badge color={"green"}>Used</Badge>
                    )}
                  </td>
                  <td>{d.unit?.name || "-"}</td>
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
                          navigate(`/device/${d.id}`);
                        }}
                      >
                        View
                      </Menu.Item>
                      <Menu.Item
                        icon={<Pencil size={14} />}
                        onClick={() => {
                          updateMenuHandler(d);
                        }}
                      >
                        Quick Update
                      </Menu.Item>
                      <Menu.Item
                        icon={<Trash size={14} />}
                        color="red"
                        onClick={() => {
                          deleteButtonHandler({
                            id: d.id!,
                            name: `${d.name} - ${d.serialNumber}`,
                          });
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
      <DevsAddModal unitOptions={unitOptions} saveHandler={saveButtonHandler} />
      <DeleteDialog
        open={showDeletion}
        data={deviceDeletion}
        onSubmit={deletionDeviceHandler}
        onClose={closeModalHandler}
        loading={deletionLoading}
      />
    </>
  );
}
