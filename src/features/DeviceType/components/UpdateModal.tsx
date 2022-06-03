import { Modal, TextInput, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import GroupButtonModal from "../../../components/common/GroupButtonModal";
import { updateSimpleDeviceType } from "../utils/service";
import {
  deviceTypeListFilterState,
  deviceTypeUpdateModalState,
} from "../utils/store";
import { DeviceType } from "../utils/type";

export default function UpdateDeviceTypeModal() {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<DeviceType>({ initialValues: { name: undefined } });
  const updateModal = useRecoilValue(deviceTypeUpdateModalState);
  const closeModal = useResetRecoilState(deviceTypeUpdateModalState);
  const setFilter = useSetRecoilState(deviceTypeListFilterState);

  useEffect(() => {
    form.setFieldValue("name", updateModal.data.name || "");
  }, [updateModal.data]);

  const submitHandler = (data: DeviceType) => {
    setLoading(true);
    updateSimpleDeviceType({ name: data.name, id: updateModal.data.id! })
      .then((res) => {
        showNotification({
          title: "Update Device Type",
          message: `Update Device Type ${res.name} Success!`,
          color: "green",
        });
        setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
        closeModal();
      })
      .catch((e) => {
        showNotification({
          title: "Update Device Type",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      opened={updateModal.showModal}
      onClose={closeModal}
      radius={"lg"}
      title="Create Device Type"
      withCloseButton={!isLoading}
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}
    >
      <form onSubmit={form.onSubmit(submitHandler)}>
        <TextInput
          label="Device Type Name"
          required
          description="Enter Device Type name here..."
          {...form.getInputProps("name")}
        />
        <Divider my={20} />
        <GroupButtonModal onDiscard={closeModal} loading={isLoading} />
      </form>
    </Modal>
  );
}
