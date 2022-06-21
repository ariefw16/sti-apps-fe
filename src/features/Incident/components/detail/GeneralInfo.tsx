import {
  Badge,
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";
import moment from "moment";
import { useState } from "react";
import { Check } from "tabler-icons-react";
import { Incident } from "../../utils/type";
import SetDoneModal from "../SetDoneModal";
import { updateIncident } from "../../utils/service";
import { showNotification } from "@mantine/notifications";

export default function GeneralInfo(props: {
  incident?: Incident;
  setTrigger?: any;
}) {
  const { incident, setTrigger } = props;
  const downtimeSecs = incident?.isDone
    ? moment
        .duration(moment(incident.resolveDate).diff(incident.eventDate))
        .asMinutes()
    : moment.duration(moment().diff(incident!.eventDate)).asMinutes();
  const hours = Math.floor(downtimeSecs / 60);
  const minutes = Math.floor(downtimeSecs % 60);
  const [doneModal, setDoneModal] = useState(false);

  const setDoneHandler = () => {
    setDoneModal(true);
  };
  const onCloseModalHandler = () => {
    setDoneModal(false);
  };
  const onSubmitDoneHandler = (data: {
    resolveNote: string;
    resolveDate: Date;
  }) => {
    updateIncident(incident!.id!, { ...data, isDone: true })
      .then((res) => {
        setTrigger((t: any) => !t);
        setDoneModal(false);
      })
      .catch((e) => {
        showNotification({
          title: "Set Done",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <Paper p={20} radius="lg">
            <TextInput
              value={incident?.name || ""}
              description="Incident Name / Trigger"
              label="Incident"
              readOnly
              variant="filled"
              mb={20}
            />
            <TextInput
              value={incident?.eventNote || ""}
              description="Detail / Notes of incident"
              label="Notes"
              readOnly
              variant="filled"
              mb={20}
            />
            <TextInput
              value={
                moment(incident?.eventDate).format("DD-MMM-YYYY HH:mm:ss") || ""
              }
              description="Event time captured / reported"
              label="Event Time"
              readOnly
              variant="filled"
              mb={20}
            />
            {incident?.triggerType === "monitoring" ? (
              <TextInput
                value={incident?.eventId || ""}
                description="Event ID from Monitoring"
                label="Event ID"
                readOnly
                variant="filled"
                mb={20}
              />
            ) : (
              <TextInput
                value={incident?.reportedBy?.name || ""}
                description="Employee Reporter Name"
                label="Reported by"
                readOnly
                variant="filled"
                mb={20}
              />
            )}
            <TextInput
              value={incident?.triggerType || ""}
              description="Trigger From Monitoring or Employee Report"
              label="Trigger"
              readOnly
              variant="filled"
              mb={20}
            />
          </Paper>
        </Grid.Col>
        <Grid.Col span={12}>
          <Paper radius={"lg"} p={20}>
            <Group position="apart">
              <Title order={5}>Incident Status</Title>
              {incident?.isDone && <Badge color={"teal"}>Done / Solved</Badge>}
              {!incident?.isDone && (
                <Badge color="orange">In Progress (Not Done)</Badge>
              )}
            </Group>
            <Divider my={"md"} variant="dotted" />
            <TextInput
              label="Downtime (hours)"
              description="Down time from incident reported / triggered (in Hours)"
              readOnly
              variant="filled"
              mb={20}
              value={`${hours} jam ${minutes} menit`}
            />
            {incident?.isDone && (
              <>
                <TextInput
                  label="Resolve Notes"
                  description="Resolve Notes / Solution for incidents"
                  readOnly
                  variant="filled"
                  mb={20}
                  value={incident?.resolveNote}
                />
                <TextInput
                  label="Resolve Date time"
                  description="Date time incident is resolved"
                  readOnly
                  variant="filled"
                  mb={20}
                  value={moment(incident?.resolveDate).format(
                    "DD-MMM-YYYY HH:mm:ss"
                  )}
                />
              </>
            )}
            {!incident?.isDone && (
              <Group position="right">
                <Button
                  onClick={setDoneHandler}
                  color={"teal"}
                  leftIcon={<Check />}
                >
                  Set as Done
                </Button>
              </Group>
            )}
          </Paper>
        </Grid.Col>
      </Grid>
      <SetDoneModal
        open={doneModal}
        onClose={onCloseModalHandler}
        onSubmit={onSubmitDoneHandler}
      />
    </>
  );
}
