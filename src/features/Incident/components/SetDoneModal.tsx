import { Divider, Group, Modal, Textarea } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import moment from "moment";
import { Calendar } from "tabler-icons-react";
import GroupButtonModal from "../../../components/common/GroupButtonModal";

export default function SetDoneModal(props: {
  open: boolean;
  onClose: any;
  onSubmit: any;
}) {
  const { open, onClose, onSubmit } = props;
  const form = useForm({
    initialValues: {
      resolveNote: "",
      resolveDate: moment().toDate(),
    },
  });

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Set Incident Done"
      size={"md"}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Textarea
          label="Notes"
          description="Note / Solution for resolving incident"
          {...form.getInputProps("resolveNote")}
        />
        <Group>
          <DatePicker
            placeholder="Pick date"
            label="Resolve date"
            icon={<Calendar size={16} />}
            {...form.getInputProps("resolveDate")}
          />
          <TimeInput
            label="Resolve Time"
            {...form.getInputProps("resolveDate")}
          />
        </Group>
        <Divider my={"md"} variant="dotted" />
        <GroupButtonModal onDiscard={onClose} loading={false} />
      </form>
    </Modal>
  );
}
