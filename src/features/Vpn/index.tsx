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
import { deleteVPN, fetchVPN } from "./utils/service";
import {
  vpnDeleteState,
  vpnListFilterState,
  vpnListRowCountState,
  vpnListState,
} from "./utils/store";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import VPNCreateModal from "./components/VPNCreateModal";
import VPNExtendModal from "./components/VPNExtendModal";
import VPNListCard from "./components/VPNListCard";
import VPNUpdateModal from "./components/VPNUpdateModal";

export default function VPNPage() {
  const setVpn = useSetRecoilState(vpnListState);
  const setRowCount = useSetRecoilState(vpnListRowCountState);
  const [filter, setFilter] = useRecoilState(vpnListFilterState);
  const [q] = useDebouncedValue(filter.q, 300);
  const [loading, setLoading] = useState(false);
  const deletion = useRecoilValue(vpnDeleteState);
  const resetDeletion = useResetRecoilState(vpnDeleteState);

  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    { label: "VPN Management" },
  ];

  useEffect(() => {
    setLoading(true);
    fetchVPN({
      page: filter.page,
      limit: filter.limit,
      q: filter.q,
      unitId: filter.unitId,
    })
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

  const deleteVPNHandler = () => {
    deleteVPN(deletion.data.id)
      .then(() => {
        showNotification({
          title: "Delete VPN",
          message: "VPN Deletion success!",
          color: "green",
        });
        resetDeletion();
        setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
      })
      .catch((e) => {
        showNotification({
          title: "Delete VPN",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

  return (
    <>
      <PageTitleComponent title="VPN Management" breadcrumbs={breadcrumbs} />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <VPNListCard />
      </Box>
      <VPNCreateModal />
      <VPNExtendModal />
      <DeleteDialog
        data={deletion.data}
        open={deletion.showModal}
        onClose={resetDeletion}
        onSubmit={deleteVPNHandler}
      />
      <VPNUpdateModal />
    </>
  );
}
