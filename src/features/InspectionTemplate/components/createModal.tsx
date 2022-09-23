import { Divider, Modal, Select, TextInput } from "@mantine/core";
import { zodResolver } from "@mantine/form";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import GroupButtonModal from "../../../components/common/GroupButtonModal";
import { SelectOptions } from "../../../types/common";
import { fetchDeviceType } from "../../DeviceType/utils/service";
import { saveInspectionTemplate } from "../utils/service";
import { CreateInspectionTemplate } from "../utils/type";

const schema = z.object({
  name: z.string().min(1),
  deviceTypeId: z.string().min(1),
});
export default function CreateInspectionTemplateModal(props: {
  opened: boolean;
  onClose: any;
}) {
  const form = useForm<CreateInspectionTemplate>({
    initialValues: {
      name: "",
      deviceTypeId: "",
    },
    schema: zodResolver(schema),
  });
  const { opened, onClose } = props;
  const [loading, setLoading] = useState(false);
  const [typeSelection, setTypeSelection] = useState<SelectOptions[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeviceType({})
      .then((res) => {
        setTypeSelection(
          res.data.map((dt) => ({ label: dt.name!, value: dt.id!.toString() }))
        );
      })
      .catch((e) => {
        showNotification({
          title: "Fetch DeviceType",
          message: `Error! ${e.message}`,
        });
      });
  }, []);

  const submitHandler = (data: CreateInspectionTemplate) => {
    setLoading(true);
    saveInspectionTemplate(data)
      .then((res) => {
        showNotification({
          title: "Create Inspection Template",
          message: "Inspection Template Created!",
          color: "green",
        });
        navigate(`/inspection-template/${res.id}`);
        onClose();
      })
      .catch((e) => {
        showNotification({
          title: "Create Inspection Template",
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
      opened={opened}
      onClose={onClose}
      radius={"lg"}
      size="lg"
      title="Create Inspection Template"
      withCloseButton={!loading}
      closeOnClickOutside={!loading}
      closeOnEscape={!loading}
    >
      <form onSubmit={form.onSubmit(submitHandler)}>
        <TextInput
          label="Name"
          description="Title / Name of this inspection checklist"
          my={"sm"}
          {...form.getInputProps("name")}
        />
        <Select
          data={typeSelection || []}
          placeholder="Select Options"
          label="Device Type :"
          sx={{ width: 300 }}
          radius="md"
          variant="filled"
          {...form.getInputProps("deviceTypeId")}
        />
        <Divider my={"md"} variant="dotted" />
        <GroupButtonModal onDiscard={onClose} loading={loading} />
      </form>
    </Modal>
  );
}
