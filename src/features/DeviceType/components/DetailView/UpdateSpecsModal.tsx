import { Modal, TextInput, Divider, Select, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import GroupButtonModal from "../../../../components/common/GroupButtonModal";
import { updateSpecsDeviceType } from "../../utils/service";
import { deviceTypeState, specsUpdateModalState } from "../../utils/store";
import { DeviceTypeSpec } from "../../utils/type";

export default function UpdateSpecsModal() {
  const modalState = useRecoilValue(specsUpdateModalState);
  const resetModalState = useResetRecoilState(specsUpdateModalState);
  const [isLoading, setLoading] = useState(false);
  const form = useForm<DeviceTypeSpec>({
    initialValues: {
      name: "",
      specType: "TEXT",
      isMandatory: false,
    },
  });
  const { id } = useParams();
  const setDeviceType = useSetRecoilState(deviceTypeState);

  useEffect(() => {
    form.setFieldValue("name", modalState.data.name || "");
    form.setFieldValue("specType", modalState.data.specType || "TEXT");
  }, [modalState.showModal]);

  const formSubmitHandler = (data: DeviceTypeSpec) => {
    setLoading(true);
    updateSpecsDeviceType({
      ...data,
      deviceTypeId: +id!,
      id: modalState.data.id,
    })
      .then((res) => {
        setDeviceType((t) => {
          const ret = t.DeviceTypeSpec?.map((d) => d);
          const idx = t.DeviceTypeSpec?.findIndex((d) => d.id === res.id);
          if (idx && ret) ret[idx] = res;
          return { ...t, DeviceTypeSpec: ret };
        });
        showNotification({
          title: "Specs Update",
          message: "Updating Specification is Done!",
          color: "green",
        });
        resetModalState();
      })
      .catch((e) => {
        showNotification({
          title: "Specs Update",
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
      title="Update Specification"
      withCloseButton={!isLoading}
      closeOnEscape={!isLoading}
      closeOnClickOutside={!isLoading}
      overlayBlur={1}
    >
      <form onSubmit={form.onSubmit(formSubmitHandler)}>
        <TextInput
          label="Name"
          description="Put Specification name to show"
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
          defaultChecked={modalState.data.isMandatory}
          {...form.getInputProps("isMandatory")}
        />
        <Divider my={10} variant="dotted" />
        <GroupButtonModal onDiscard={resetModalState} loading={isLoading} />
      </form>
    </Modal>
  );
}
