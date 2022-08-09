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
import TabNav from "../../components/common/TabNav";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import AddActivityModal from "./components/AddActivityModal";
import ActivityTimeline from "./components/detail/ActivityTimeline";
import DeviceInfo from "./components/detail/DeviceInfo";
import GeneralInfo from "./components/detail/GeneralInfo";
import LogDetail from "./components/detail/LogDetail";
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
        <Grid.Col md={7} sm={12}>
          <TabNav mt={40}>
            <Tabs.Tab label="General Info" icon={<InfoCircle size={14} />}>
              <GeneralInfo incident={detail} setTrigger={setTrigger} />
            </Tabs.Tab>
            <Tabs.Tab label="Device Info" icon={<Tools size={14} />}>
              <DeviceInfo device={detail.device} />
            </Tabs.Tab>
            <Tabs.Tab label="Logs" icon={<Notebook size={14} />}>
              <LogDetail log={detail.incidentLog} />
            </Tabs.Tab>
          </TabNav>
        </Grid.Col>
        <Grid.Col sm={12} md={5} mt={40}>
          <Group position="right">
            <Button
              color={"lime"}
              leftIcon={<Plus />}
              onClick={addActivityButtonHandler}
              radius="md"
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
