import { Box, Grid } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useSetRecoilState } from "recoil";
import { z } from "zod";
import CreateMeetingButtonGroup from "./components/create/CreateMeetingButtonGroup";
import MeetingCreateForm from "./components/create/MeetingCreateForm";
import MeetingCreatePropsForm from "./components/create/MeetingCreatePropsForm";
import { saveMeeting } from "./utils/service";
import { meetingCreateLoadingState } from "./utils/store";
import { MeetingCreate } from "./utils/type";

const schema = z.object({
  name: z.string().min(3),
  startDate: z.date(),
  duration: z.number().gt(0),
  password: z.string().optional(),
  audio: z.string(),
  autoRecording: z.string(),
  enableBreakout: z.boolean().optional(),
  hostVideo: z.boolean().optional(),
  joinBeforeHost: z.boolean().optional(),
  jbhTime: z.string().optional(),
  muteUponEntry: z.boolean().optional(),
  participantVideo: z.boolean().optional(),
  waitingRoom: z.boolean().optional(),
});

export default function RequestMeetingPage() {
  const form = useForm<MeetingCreate>({
    initialValues: {
      name: "",
      startDate: new Date(),
      duration: 60,
      password: "",
      audio: "both",
      autoRecording: "cloud",
      enableBreakout: false,
      hostVideo: false,
      joinBeforeHost: true,
      jbhTime: "0",
      muteUponEntry: true,
      participantVideo: true,
      waitingRoom: false,
      expectedParticipant: 50,
      requestorName: "",
      requestorEmail: "",
    },
    schema: zodResolver(schema),
  });
  const setLoading = useSetRecoilState(meetingCreateLoadingState);

  const submitFormHandler = (data: MeetingCreate) => {
    setLoading(true);
    saveMeeting(data)
      .then(() => {
        showNotification({
          title: "Create Meetings",
          message: `Meeting Creation success!`,
          color: "green",
        });
      })
      .catch((e) => {
        showNotification({
          title: "Create Meetings",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <body style={{ backgroundColor: "whitesmoke", padding: 20 }}>
      <form onSubmit={form.onSubmit(submitFormHandler)}>
        <Grid mt={50}>
          <Grid.Col sm={12} md={4}>
            <MeetingCreatePropsForm form={form} />
          </Grid.Col>
          <Grid.Col sm={12} md={8}>
            <Grid>
              <Grid.Col span={12}>
                <MeetingCreateForm form={form} />
              </Grid.Col>
              <Grid.Col span={12}>
                <CreateMeetingButtonGroup />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </form>
    </body>
  );
}
