import {
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Menu,
  Table,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { ChevronDown, Pencil, Plus, Trash } from "tabler-icons-react";
import DeleteDialog from "../../../../components/common/DeleteDialog";
import { DataToDelete } from "../../../../types/common";
import { deleteSpecsDeviceType } from "../../utils/service";
import {
  deviceTypeDetailLoadingState,
  deviceTypeState,
  specsCreateModalState,
  specsDeleteModalState,
  specsUpdateModalState,
} from "../../utils/store";
import { DeviceType } from "../../utils/type";
import UpdateSpecsModal from "./UpdateSpecsModal";

export default function DeviceTypeViewSpecification() {
  const [deviceType, setDeviceType] = useRecoilState(deviceTypeState);
  const setCreateSpecs = useSetRecoilState(specsCreateModalState);
  const setDeletion = useSetRecoilState(specsDeleteModalState);
  const specsDeletion = useRecoilValue(specsDeleteModalState);
  const resetSpecsDeletion = useResetRecoilState(specsDeleteModalState);
  const setUpdation = useSetRecoilState(specsUpdateModalState);
  const fetchLoading = useRecoilValue(deviceTypeDetailLoadingState);

  const createSpecsButtonHandler = () => {
    setCreateSpecs((c) => ({ ...c, showModal: true }));
  };
  const deleteButtonHandler = (data: DataToDelete) => {
    setDeletion({ showModal: true, data });
  };
  const specsDeletionHandler = () => {
    deleteSpecsDeviceType(specsDeletion.data.id)
      .then((id) => {
        setDeviceType((dt) => ({
          ...dt,
          DeviceTypeSpec: dt.DeviceTypeSpec?.filter((f) => f.id !== id),
        }));
        showNotification({
          title: "Specs Deletion",
          message: "Deletion success!",
          color: "green",
        });
        resetSpecsDeletion();
      })
      .catch((e) => {
        showNotification({
          title: "Specs Deletion",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };
  const editButtonHandler = (data: DeviceType) => {
    setUpdation({ showModal: true, data });
  };

  return (
    <>
      <Title order={4}>Specification list</Title>
      <Divider my={10} variant="dotted" />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={fetchLoading} />
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Specification</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deviceType.DeviceTypeSpec?.map((dt) => (
              <tr key={dt.id}>
                <td width={"50%"}>
                  {dt.name} {dt.isMandatory ? "*" : ""}
                </td>
                <td width={"20%"}>{dt.specType}</td>
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
                        editButtonHandler(dt);
                      }}
                    >
                      Update
                    </Menu.Item>
                    <Menu.Item
                      icon={<Trash size={14} />}
                      color="red"
                      onClick={() => {
                        deleteButtonHandler({
                          id: dt.id!,
                          name: dt.name!,
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
      </Box>
      <Divider my={10} variant="dotted" />
      <Group position="right">
        <Button
          size="xs"
          leftIcon={<Plus />}
          variant="outline"
          onClick={createSpecsButtonHandler}
          radius="md"
          loading={fetchLoading}
        >
          Add New Specs
        </Button>
      </Group>
      <DeleteDialog
        open={specsDeletion.showModal}
        onClose={resetSpecsDeletion}
        data={specsDeletion.data}
        onSubmit={specsDeletionHandler}
      />
      <UpdateSpecsModal />
    </>
  );
}
