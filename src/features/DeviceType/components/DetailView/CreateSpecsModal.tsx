import { Checkbox, Divider, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import GroupButtonModal from "../../../../components/common/GroupButtonModal";
import { createSpecsDeviceType } from "../../utils/service";
import { deviceTypeState, specsCreateModalState } from "../../utils/store";
import { DeviceTypeSpec } from "../../utils/type";

export default function CreateSpecsModal() {
  const modalState = useRecoilValue(specsCreateModalState);
  const resetModalState = useResetRecoilState(specsCreateModalState);
  const [deviceType, setDeviceType] = useRecoilState(deviceTypeState);
  const [isLoading, setLoading] = useState(false);
  const form = useForm<DeviceTypeSpec>({
    initialValues: {
      name: "",
      specType: "TEXT",
      isMandatory: false,
    },
  });

  const formSubmitHandler = (data: DeviceTypeSpec) => {
    setLoading(true);
    createSpecsDeviceType(deviceType.id!, data)
      .then((res) => {
        setDeviceType((dt) => ({
          ...dt,
          DeviceTypeSpec: dt.DeviceTypeSpec
            ? [...dt.DeviceTypeSpec, res]
            : [res],
        }));
        showNotification({
          title: "Create Specification",
          message: "Specification Creation is done!",
          color: "green",
        });
        resetModalState();
        form.reset();
      })
      .catch((e) => {
        showNotification({
          title: "Create Specification",
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
      opened={modalState.showModal}
      onClose={resetModalState}
      title="Create new Specification"
      withCloseButton={!isLoading}
      closeOnEscape={!isLoading}
      closeOnClickOutside={!isLoading}
      overlayBlur={1}
    >
      <form onSubmit={form.onSubmit(formSubmitHandler)}>
        <TextInput
          label="Name"
          description="Put new Specification name to create"
          {...form.getInputProps("name")}
        />
        <Select
          mt={15}
          data={["TEXT", "SELECTION"]}
          label="Type"
          description="Input type for specification when create a Device"
          {...form.getInputProps("specType")}
        />
        <Checkbox
          label="Is Mandatory field"
          my={25}
          {...form.getInputProps("isMandatory")}
        />
        <Divider my={10} variant="dotted" />
        <GroupButtonModal onDiscard={resetModalState} loading={isLoading} />
      </form>
    </Modal>
  );
}
