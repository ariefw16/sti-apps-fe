import { Button, Grid, Group, Tabs, Text, Timeline } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  InfoCircle,
  MessageDots,
  Notebook,
  Plus,
  Tools,
} from "tabler-icons-react";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import AddActivityModal from "./components/AddActivityModal";
import ActivityTimeline from "./components/detail/ActivityTimeline";
import { fetchSingleIncident } from "./utils/service";
import {
  incidentActivityCreationState,
  incidentDetailState,
} from "./utils/store";

export default function DetailIncidentPage() {
  const breadcrumb: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    { label: "Incidents", to: "/incident" },
    { label: "Detail Incident" },
  ];
  const [detail, setDetail] = useRecoilState(incidentDetailState);
  const { id } = useParams();
  const setActivityModal = useSetRecoilState(incidentActivityCreationState);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (id) {
      fetchSingleIncident(+id)
        .then((res) => {
          setDetail(res);
          console.log(detail);
        })
        .catch((e) => {
          showNotification({
            title: "Fetch Incident",
            message: `Error! ${e.message}`,
            color: "red",
          });
        });
    }
  }, [id, trigger]);

  const addActivityButtonHandler = () => {
    setActivityModal({
      showModal: true,
      data: { incidentId: +id!, incident: detail },
    });
  };
  const afterSubmitActivityHandler = () => {
    setTrigger((t) => !t);
  };

  return (
    <>
      <PageTitleComponent
        title="Detail Incident Data"
        breadcrumbs={breadcrumb}
      />
      <Grid>
        <Grid.Col span={7}>
          <Tabs variant="default" mt={40} ml={20} mr={20}>
            <Tabs.Tab
              label="General Info"
              icon={<InfoCircle size={14} />}
            ></Tabs.Tab>
            <Tabs.Tab label="Device Info" icon={<Tools size={14} />}></Tabs.Tab>
            <Tabs.Tab label="Logs" icon={<Notebook size={14} />}></Tabs.Tab>
          </Tabs>
        </Grid.Col>
        <Grid.Col span={5} mt={40}>
          <Group position="right">
            <Button
              color={"lime"}
              leftIcon={<Plus />}
              onClick={addActivityButtonHandler}
            >
              Add Activity
            </Button>
          </Group>
          <ActivityTimeline activity={detail.incidentActivity} />
          <AddActivityModal afterSubmit={afterSubmitActivityHandler} />
        </Grid.Col>
      </Grid>
    </>
  );
}
