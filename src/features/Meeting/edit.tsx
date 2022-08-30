import { Grid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import EditMeetingButtonGroup from "./components/edit/EditMeetingButtonGroup";
import { fetchSingleMeeting, updateMeeting } from "./utils/service";
import { meetingDetailState, meetingUpdateLoadingState } from "./utils/store";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { Meeting, MeetingUpdate } from "./utils/type";
import MeetingEditForm from "./components/edit/MeetingEditForm";
import moment from "moment";
import MeetingPropsEditForm from "./components/edit/MeetingPropsEditForm";

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
  expectedParticipant: z.number().optional(),
});
export default function EditMeetingPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Meetings Management",
      to: "/meetings",
    },
    {
      label: "Update",
    },
  ];
  const { id } = useParams();
  const [detail, setDetail] = useRecoilState(meetingDetailState);
  const setLoading = useSetRecoilState(meetingUpdateLoadingState);
  const navigate = useNavigate();

  const form = useForm<MeetingUpdate>({
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
      jbhTimeString: "0",
      muteUponEntry: true,
      participantVideo: true,
      waitingRoom: false,
      expectedParticipant: 50,
    },
    schema: zodResolver(schema),
  });

  useEffect(() => {
    if (+id! !== detail.id!) {
      setLoading(true);
      fetchSingleMeeting(+id!)
        .then((res) => {
          setDetail(res);
        })
        .catch((e) => {
          showNotification({
            title: "Fetch Meeting",
            message: `Error! ${e.message}`,
            color: "red",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);
  useEffect(() => {
    setDefaultFormValues(detail);
  }, []);

  const setDefaultFormValues = (data: Meeting) => {
    form.setFieldValue("status", data.status || 0);
    form.setFieldValue("name", data.name || "");
    form.setFieldValue("startDate", moment(data.startDate).toDate());
    form.setFieldValue("duration", data.duration || 0);
    form.setFieldValue("password", data.password || "");
    form.setFieldValue("audio", data.audio || "");
    form.setFieldValue("autoRecording", data.autoRecording || "");
    form.setFieldValue("enableBreakout", data.enableBreakout || false);
    form.setFieldValue("hostVideo", data.hostVideo || false);
    form.setFieldValue("joinBeforeHost", data.joinBeforeHost || false);
    form.setFieldValue("jbhTimeString", data.jbhTime?.toString() || "");
    form.setFieldValue("muteUponEntry", data.muteUponEntry || false);
    form.setFieldValue("participantVideo", data.participantVideo || false);
    form.setFieldValue(
      "expectedParticipant",
      data.expectedParticipant || undefined
    );
  };
  const submitFormHandler = (data: MeetingUpdate) => {
    setLoading(true);
    updateMeeting({ id: +id!, data })
      .then((res) => {
        setDetail(res);
        navigate(`/meetings/${id}`);
        showNotification({
          title: "Update Meeting",
          message: "Meeting update successfully",
          color: "green",
        });
      })
      .catch((e) => {
        showNotification({
          title: "Update Meeting",
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
        title="Update / Edit Meeting Data"
      />
      <form onSubmit={form.onSubmit(submitFormHandler)}>
        <Grid mt={50}>
          <Grid.Col sm={12} md={4}>
            <MeetingPropsEditForm form={form} />
          </Grid.Col>
          <Grid.Col sm={12} md={8}>
            <Grid>
              <Grid.Col span={12}>
                <MeetingEditForm form={form} />
              </Grid.Col>
              <Grid.Col span={12}>
                <EditMeetingButtonGroup />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}
