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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChevronDown, Eye, Pencil, Plus, Trash } from "tabler-icons-react";
import DeleteDialog from "../../../../components/common/DeleteDialog";
import { DataToDelete, SelectOptions } from "../../../../types/common";
import { deleteDevice } from "../../../Devices/utils/service";
import { Device } from "../../../Devices/utils/type";
import { addDeviceToDeviceTemplate } from "../../utils/service";
import {
  deviceTemplateDetailState,
  deviceTemplateQuickUpdateDeviceState,
  deviceTemplateQuickUpdateTriggreState,
  deviceTemplateYearSelectionState,
} from "../../utils/store";
import DevsAddModal from "../create/DevsAddModal";

export default function DeviceTemplateDevicesDetail(props: {
  unitOptions: SelectOptions[];
}) {
  const { unitOptions } = props;
  const template = useRecoilValue(deviceTemplateDetailState);
  const yearSelection = useRecoilValue(deviceTemplateYearSelectionState);
  const navigate = useNavigate();
  const setQuickUpdate = useSetRecoilState(
    deviceTemplateQuickUpdateDeviceState
  );
  const setTrigger = useSetRecoilState(deviceTemplateQuickUpdateTriggreState);
  const [deviceDeletion, setDeviceDeletion] = useState<DataToDelete>({
    id: 0,
    name: "",
  });
  const [showDeletion, setShowDeletion] = useState(false);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const selected = yearSelection
      .filter((fy) => fy.selected)
      .map((my) => my.year);
    setDevices(
      template.devices?.filter((fd) => {
        if (selected.length < 1) return true;
        else return selected.includes(fd.year ?? "");
      }) ?? []
    );
  }, [yearSelection]);

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
    year: string;
  }) => {
    const { sn, unitId, isSpare, year } = props;
    addDeviceToDeviceTemplate(template.id!, {
      serialNumber: sn,
      isSpare: isSpare === "1",
      unitId,
      year,
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
        closeDeletionHandler();
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
    setOpenModal(false);
  };
  const deleteButtonHandler = (data: DataToDelete) => {
    setShowDeletion(true);
    setDeviceDeletion({ ...data });
  };
  const closeDeletionHandler = () => {
    setDeviceDeletion({ id: 0, name: "" });
    setShowDeletion(false);
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
              setOpenModal(true);
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
              <th>IP Address</th>
              <th>Purchase year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices &&
              devices.map((d) => (
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
                  <td>{d.ipAddress}</td>
                  <td>{d.year}</td>
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
      <DevsAddModal
        unitOptions={unitOptions}
        saveHandler={saveButtonHandler}
        opened={openModal}
        onClose={closeModalHandler}
      />
      <DeleteDialog
        open={showDeletion}
        data={deviceDeletion}
        onSubmit={deletionDeviceHandler}
        onClose={closeDeletionHandler}
        loading={deletionLoading}
      />
    </>
  );
}
