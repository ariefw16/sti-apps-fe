import {
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { Pencil, Trash } from "tabler-icons-react";
import DeleteDialog from "../../components/common/DeleteDialog";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import ViewGeneralDeviceType from "./components/ViewGeneral";
import { deviceTypeDeleteModalState, deviceTypeState } from "./utils/store";

export default function DeviceTypeDetailPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    { label: "home", to: "/" },
    { label: "Device Type", to: "/device-type" },
    { label: "Detail Device Type" },
  ];
  const deletion = useRecoilValue(deviceTypeDeleteModalState);
  const resetDeletion = useResetRecoilState(deviceTypeDeleteModalState);
  const setDeviceType = useSetRecoilState(deviceTypeState);

  useEffect(() => {}, []);

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
          <Paper p={"lg"} radius="lg"></Paper>
        </Grid.Col>
      </Grid>
      <DeleteDialog
        open={deletion.showModal}
        onClose={resetDeletion}
        data={deletion.data}
        onSubmit={undefined}
      />
    </>
  );
}
