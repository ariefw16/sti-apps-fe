import PageTitleComponent from "../../components/common/PageTitle";
import { Box, LoadingOverlay } from "@mantine/core";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import { useEffect, useState } from "react";
import GroupListCard from "./components/list/GroupListCard";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  groupListCountState,
  groupListFilterState,
  groupListState,
  groupDeleteState,
} from "./utils/store";
import { deleteGroup, fetchGroup } from "./utils/service";
import { showNotification } from "@mantine/notifications";
import { useDebouncedValue } from "@mantine/hooks";
import DeleteDialog from "../../components/common/DeleteDialog";
import GroupUpdateModal from "./components/list/GroupUpdateModal";
import GroupCreateModal from "./components/list/GroupCreateModal";
import GroupManageMemberModal from "./components/list/ManageMemberModal";

export default function GroupPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "User Group Management",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [loadingDeletion, setLoadingDeletion] = useState(false);
  const setGroup = useSetRecoilState(groupListState);
  const setRowCount = useSetRecoilState(groupListCountState);
  const [filter, setFilter] = useRecoilState(groupListFilterState);
  const [q] = useDebouncedValue(filter.q, 300);
  const deletion = useRecoilValue(groupDeleteState);
  const resetDeletion = useResetRecoilState(groupDeleteState);

  const deletionSubmitHandler = () => {
    setLoadingDeletion(true);
    deleteGroup(deletion.data.id)
      .then(() => {
        showNotification({
          title: "User Group Deletion",
          message: "User Group Deletion success!",
          color: "green",
        });
        resetDeletion();
        setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
      })
      .catch((e) => {
        showNotification({
          title: "User Group Deletion",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoadingDeletion(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchGroup(filter)
      .then((res) => {
        setRowCount(res.rowCount);
        setGroup(res.data);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Group",
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
      <PageTitleComponent
        title="User Group Management"
        breadcrumbs={breadcrumbs}
      />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <GroupListCard />
      </Box>
      <DeleteDialog
        open={deletion.showModal}
        onClose={resetDeletion}
        data={deletion.data}
        onSubmit={deletionSubmitHandler}
        loading={loadingDeletion}
      />
      <GroupUpdateModal />
      <GroupCreateModal />
      <GroupManageMemberModal />
    </>
  );
}
