import { Grid } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { z } from "zod";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import { authState } from "../Auth/utils/store";
import CreateMeetingButtonGroup from "./components/create/CreateMeetingButtonGroup";
import MeetingCreateForm from "./components/create/MeetingCreateForm";
import MeetingCreatePropsForm from "./components/create/MeetingCreatePropsForm";
import { saveMeeting } from "./utils/service";
import {
  meetingCreateLoadingState,
  meetingListFilterState,
} from "./utils/store";
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

export default function CreateMeetingPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Meeting Management",
      to: "/meetings",
    },
    {
      label: "Create",
    },
  ];
  const auth = useRecoilValue(authState);
  const form = useForm<MeetingCreate>({
    initialValues: {
      name: "",
      startDate: new Date(),
      startDateTime: new Date(),
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
  const setFilter = useSetRecoilState(meetingListFilterState);
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldValue("requestorName", auth.user?.name || "");
    form.setFieldValue("requestorEmail", auth.user?.email || "");
  }, [auth]);

  const submitFormHandler = (data: MeetingCreate) => {
    setLoading(true);
    saveMeeting(data)
      .then(() => {
        showNotification({
          title: "Create Meetings",
          message: `Meeting Creation success!`,
          color: "green",
        });
        navigate("/meetings");
        setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
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
    <>
      <PageTitleComponent
        breadcrumbs={breadcrumbs}
        title="Create New Meeting"
      />
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
    </>
  );
}
