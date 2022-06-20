import { Divider, Group, Modal, Textarea, TextInput } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import moment from "moment";
import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { Calendar } from "tabler-icons-react";
import { z } from "zod";
import GroupButtonModal from "../../../components/common/GroupButtonModal";
import { addActivity } from "../utils/service";
import { incidentActivityCreationState } from "../utils/store";
import { IncidentActivity } from "../utils/type";

const schema = z.object({
  description: z.string().optional(),
  name: z.string().min(3),
});

export default function AddActivityModal() {
  const [activity, setActivity] = useRecoilState(incidentActivityCreationState);
  const resetCreation = useResetRecoilState(incidentActivityCreationState);
  const [loading, setLoading] = useState(false);
  const form = useForm<IncidentActivity>({
    initialValues: {
      description: "",
      activityDate: moment().toDate(),
      name: "",
    },
    schema: zodResolver(schema),
  });

  const submitFormHandler = (data: IncidentActivity) => {
    setLoading(true);
    data.incidentId = activity.data.incidentId;
    addActivity(data)
      .then((res) => {
        showNotification({
          title: "Add Activity",
          message: "Activity added successfuly!",
          color: "green",
        });
        resetCreation();
      })
      .catch((e) => {
        showNotification({
          title: "Add Activity",
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
      opened={activity.showModal}
      onClose={resetCreation}
      title={`Add new Activity on ${activity.data.incident?.eventNote} - ${activity.data.incident?.device?.ipAddress}`}
      size={"lg"}
      closeOnEscape={!loading}
      closeOnClickOutside={!loading}
      withCloseButton={!loading}
    >
      <form onSubmit={form.onSubmit(submitFormHandler)}>
        <TextInput
          label="Activity"
          placeholder="Input Activity"
          description="Input Summary of Activity here."
          {...form.getInputProps("name")}
          my="md"
          required
          disabled={loading}
        />
        <Textarea
          label="Description"
          placeholder="Input Description / Notes / Detail"
          description="Put Descrption or Details of activity"
          {...form.getInputProps("description")}
          my="md"
          disabled={loading}
        />
        <Group>
          <DatePicker
            placeholder="Pick date"
            label="Activity date"
            icon={<Calendar size={16} />}
            {...form.getInputProps("activityDate")}
            disabled={loading}
          />
          <TimeInput
            label="Activity Time"
            {...form.getInputProps("activityDate")}
            disabled={loading}
          />
        </Group>
        <Divider my={"lg"} variant="dotted" />
        <GroupButtonModal onDiscard={resetCreation} loading={loading} />
      </form>
    </Modal>
  );
}
