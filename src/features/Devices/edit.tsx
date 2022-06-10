import { LoadingOverlay, Grid, Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import DeviceSpecsCardDetail from "./components/detail/DeviceSpecsCardDetail";
import DeviceGeneralEdit from "./components/edit/DeviceGeneralEdit";
import { fetchSingleDevice } from "./utils/service";
import { deviceDetailState } from "./utils/store";

export default function EditDevicePage() {
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
      label: "Update Device",
    },
  ];
  const [device, setDevice] = useRecoilState(deviceDetailState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (device.id !== +id!) {
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
    }
  }, [id]);

  return (
    <>
      <PageTitleComponent
        title="Update Data Device "
        breadcrumbs={breadcrumbs}
      />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <Grid mt={50}>
          <Grid.Col span={4}>
            <DeviceSpecsCardDetail />
          </Grid.Col>
          <Grid.Col span={8}>
            <DeviceGeneralEdit />
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
}
