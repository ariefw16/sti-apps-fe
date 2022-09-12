import { Grid, Paper } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import DeleteDialog from "../../components/common/DeleteDialog";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import CreateSpecsModal from "./components/DetailView/CreateSpecsModal";
import ViewGeneralDeviceType from "./components/DetailView/ViewGeneral";
import DeviceTypeViewSpecification from "./components/DetailView/ViewSpecification";
import { fetchSingleDeviceType } from "./utils/service";
import {
  deviceTypeDeleteModalState,
  deviceTypeDetailLoadingState,
  deviceTypeState,
} from "./utils/store";

export default function DeviceTypeDetailPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    { label: "home", to: "/" },
    { label: "Device Type", to: "/device-type" },
    { label: "Detail Device Type" },
  ];
  const deletion = useRecoilValue(deviceTypeDeleteModalState);
  const resetDeletion = useResetRecoilState(deviceTypeDeleteModalState);
  const setDeviceType = useSetRecoilState(deviceTypeState);
  const setLoading = useSetRecoilState(deviceTypeDetailLoadingState);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchSingleDeviceType(+id!)
      .then((res) => {
        setDeviceType(res);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Device Type",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deletionHandler = () => {};

  return (
    <>
      <PageTitleComponent
        title="Device Type Detail"
        breadcrumbs={breadcrumbs}
      />
      <Grid sx={{ marginTop: 50 }}>
        <Grid.Col span={7}>
          <ViewGeneralDeviceType />
        </Grid.Col>
        <Grid.Col span={5}>
          <Paper p={"lg"} radius="lg">
            <DeviceTypeViewSpecification />
          </Paper>
        </Grid.Col>
      </Grid>
      <DeleteDialog
        open={deletion.showModal}
        onClose={resetDeletion}
        data={deletion.data}
        onSubmit={deletionHandler}
      />

      <CreateSpecsModal />
    </>
  );
}
