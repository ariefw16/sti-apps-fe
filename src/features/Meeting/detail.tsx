import { Grid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import ZoomAccountRecordDownloadModal from "../Zoom/components/detail/ZoomAccountRecordDownloadModal";
import DetailMeetingButtonGroup from "./components/detail/DetailMeetingButtonGroup";
import MeetingDetailForm from "./components/detail/MeetingDetailForm";
import MeetingPropsDetailForm from "./components/detail/MeetingPropsDetailForm";
import { fetchSingleMeeting } from "./utils/service";
import { meetingDetailState } from "./utils/store";

export default function DetailMeetingPage() {
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
      label: "Detail",
    },
  ];
  const { id } = useParams();
  const setDetail = useSetRecoilState(meetingDetailState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, [id]);

  return (
    <>
      <PageTitleComponent breadcrumbs={breadcrumbs} title="Meeting Detail" />
      <Grid mt={10}>
        <Grid.Col sm={12} md={4}>
          <MeetingPropsDetailForm loading={loading} />
        </Grid.Col>
        <Grid.Col sm={12} md={8}>
          <Grid>
            <Grid.Col span={12}>
              <MeetingDetailForm loading={loading} />
            </Grid.Col>
            <Grid.Col span={12}>
              <DetailMeetingButtonGroup loading={loading} />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      <ZoomAccountRecordDownloadModal />
    </>
  );
}
