import { Box, Grid, LoadingOverlay, Tabs } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { InfoCircle, ListSearch, Tools } from "tabler-icons-react";
import PageTitleComponent from "../../components/common/PageTitle";
import TabNav from "../../components/common/TabNav";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import DeviceGeneralCard from "./components/detail/DeviceGeneralCard";
import DeviceSpecsCardDetail from "./components/detail/DeviceSpecsCardDetail";
import DeviceIncidentCard from "./components/detail/IncidentCard";
import { fetchSingleDevice } from "./utils/service";
import { deviceDetailState } from "./utils/store";

export default function DetailDevicePage() {
  const { id } = useParams();
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Device Management",
      to: "/device",
    },
    {
      label: "Device Detail",
    },
  ];
  const setDevice = useSetRecoilState(deviceDetailState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchSingleDevice(+id!)
      .then((res) => {
        setDevice(res);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Device",
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
      <PageTitleComponent
        title="View Device Detail"
        breadcrumbs={breadcrumbs}
      />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <TabNav mt={20} position="left">
          <Tabs.Tab label="General Information" icon={<InfoCircle />}>
            <Grid mt={10}>
              <Grid.Col span={4}>
                <DeviceSpecsCardDetail />
              </Grid.Col>
              <Grid.Col span={8}>
                <DeviceGeneralCard />
              </Grid.Col>
            </Grid>
          </Tabs.Tab>
          <Tabs.Tab label="Incidents" icon={<ListSearch />}>
            <DeviceIncidentCard />
          </Tabs.Tab>
        </TabNav>
      </Box>
    </>
  );
}
