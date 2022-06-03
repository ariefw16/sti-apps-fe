import { Box, LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import DeleteDialog from "../../components/common/DeleteDialog";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import CreateDeviceTypeModal from "./components/CreateModal";
import DeviceTypeListCard from "./components/DeviceTypeListCard";
import UpdateDeviceTypeModal from "./components/UpdateModal";
import { deleteDeviceType, fetchDeviceType } from "./utils/service";
import {
  deviceTypeDeleteModalState,
  deviceTypeListCountState,
  deviceTypeListFilterState,
  deviceTypeListState,
} from "./utils/store";

export default function DeviceTypePage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    { label: "Home", to: "/" },
    { label: "Device Type" },
  ];
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useRecoilState(deviceTypeListFilterState);
  const [q] = useDebouncedValue(filter.q, 300);
  const setDeviceType = useSetRecoilState(deviceTypeListState);
  const setCount = useSetRecoilState(deviceTypeListCountState);
  const deletion = useRecoilValue(deviceTypeDeleteModalState);
  const closeDeletion = useResetRecoilState(deviceTypeDeleteModalState);

  useEffect(() => {
    setLoading(true);
    fetchDeviceType(filter)
      .then((res) => {
        setDeviceType(res.data);
        setCount(res.rowCount);
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
  }, [q, filter.page, filter.limit, filter.refreshToggle]);

  const deleteDataHandler = () => {
    deleteDeviceType(deletion.data)
      .then((res) => {
        showNotification({
          title: "Device Type Deletion",
          message: `Deletion '${res.params.name}' success!`,
          color: "green",
        });
        closeDeletion();
        setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
      })
      .catch((e) => {
        showNotification({
          title: "Device Type Deletion",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

  return (
    <>
      <PageTitleComponent title="Device Type" breadcrumbs={breadcrumbs} />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <DeviceTypeListCard />
      </Box>
      <CreateDeviceTypeModal />
      <UpdateDeviceTypeModal />
      <DeleteDialog
        onClose={closeDeletion}
        data={deletion.data}
        open={deletion.showModal}
        onSubmit={deleteDataHandler}
      />
    </>
  );
}
