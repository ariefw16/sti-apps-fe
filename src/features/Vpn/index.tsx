import { Box, LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PageTitleComponent from "../../components/common/PageTitle";
import { fetchVPN } from "../../services/vpn.service";
import {
  vpnListFilterState,
  vpnListRowCountState,
  vpnListState,
} from "../../stores/vpn.store";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import VPNListCard from "./components/VPNListCard";

export default function VPNPage() {
  const setVpn = useSetRecoilState(vpnListState);
  const setRowCount = useSetRecoilState(vpnListRowCountState);
  const filter = useRecoilValue(vpnListFilterState);
  const [q] = useDebouncedValue(filter.q, 300);
  const [loading, setLoading] = useState(false);

  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    { label: "VPN Management" },
  ];

  useEffect(() => {
    setLoading(true);
    fetchVPN({})
      .then((res) => {
        setVpn(res.data);
        setRowCount(res.rowCount);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch VPN",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [q, filter.limit, filter.page, filter.refreshToggle]);

  return (
    <>
      <PageTitleComponent title="VPN Management" breadcrumbs={breadcrumbs} />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <VPNListCard />
      </Box>
    </>
  );
}
