import { Box, LoadingOverlay, Tabs } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { InfoCircle, Tools } from "tabler-icons-react";
import DeleteDialog from "../../components/common/DeleteDialog";
import PageTitleComponent from "../../components/common/PageTitle";
import TabNav from "../../components/common/TabNav";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import DeviceListCard from "./components/DeviceListCard";
import { deleteDevice, fetchDevice } from "./utils/service";
import {
  deviceDeleteModalState,
  deviceListCountState,
  deviceListFilterState,
  deviceListState,
} from "./utils/store";

export default function DevicePage() {
  const breadcrumb: PageTitleBreadcrumbs[] = [
    { label: "Home", to: "/" },
    { label: "Device Management" },
  ];
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useRecoilState(deviceListFilterState);
  const setCount = useSetRecoilState(deviceListCountState);
  const setDevice = useSetRecoilState(deviceListState);
  const [q] = useDebouncedValue(filter.q, 300);
  const deletion = useRecoilValue(deviceDeleteModalState);
  const resetDeletion = useResetRecoilState(deviceDeleteModalState);

  useEffect(() => {
    setLoading(true);
    fetchDevice(filter)
      .then((res) => {
        setCount(res.rowCount);
        setDevice(res.data);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Devices",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter.limit, filter.page, filter.refreshToggle, q]);

  const deleteDeviceHandler = () => {
    deleteDevice(deletion.data.id)
      .then(() => {
        resetDeletion();
        showNotification({
          title: "Device Deletion",
          message: "Deletion success!",
          color: "green",
        });
        setFilter((x) => ({ ...x, refreshToggle: !x.refreshToggle }));
      })
      .catch((e) => {
        showNotification({
          title: "Device Deletion",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

  return (
    <>
      <PageTitleComponent title="Device Management" breadcrumbs={breadcrumb} />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <TabNav mt={20} position="right">
          <Tabs.Tab
            label="Device Template"
            icon={<Tools size={14} />}
          ></Tabs.Tab>
          <Tabs.Tab label="Devices" icon={<InfoCircle size={14} />}>
            <DeviceListCard />
          </Tabs.Tab>
        </TabNav>
      </Box>
      <DeleteDialog
        open={deletion.showModal}
        data={deletion.data}
        onClose={resetDeletion}
        onSubmit={deleteDeviceHandler}
      />
    </>
  );
}
