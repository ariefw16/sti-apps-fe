import { Divider, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import GroupButtonModal from "../../../components/common/GroupButtonModal";
import { createDeviceType } from "../utils/service";
import {
  deviceTypeCreateModalState,
  deviceTypeListFilterState,
} from "../utils/store";
import { DeviceType } from "../utils/type";

export default function CreateDeviceTypeModal() {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<DeviceType>({ initialValues: { name: undefined } });
  const showModal = useRecoilValue(deviceTypeCreateModalState);
  const closeModal = useResetRecoilState(deviceTypeCreateModalState);
  const setFilter = useSetRecoilState(deviceTypeListFilterState);

  const submitHandler = (data: DeviceType) => {
    setLoading(true);
    createDeviceType({ name: data.name })
      .then((res) => {
        showNotification({
          title: "Create Device Type",
          message: `Create Device Type ${res.name} Success!`,
          color: "green",
        });
        setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
        closeModal();
      })
      .catch((e) => {
        showNotification({
          title: "Create Device Type",
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
      opened={showModal}
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
