import { Box, LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import CreateDeviceTypeModal from "./components/CreateModal";
import DeviceTypeListCard from "./components/DeviceTypeListCard";
import { fetchDeviceType } from "./utils/service";
import {
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
  const filter = useRecoilValue(deviceTypeListFilterState);
  const [q] = useDebouncedValue(filter.q, 300);
  const setDeviceType = useSetRecoilState(deviceTypeListState);
  const setCount = useSetRecoilState(deviceTypeListCountState);

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

  return (
    <>
      <PageTitleComponent title="Device Type" breadcrumbs={breadcrumbs} />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <DeviceTypeListCard />
      </Box>
      <CreateDeviceTypeModal />
    </>
  );
}
