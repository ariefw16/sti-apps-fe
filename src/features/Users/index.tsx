import { LoadingOverlay, Box } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import DeleteDialog from "../../components/common/DeleteDialog";
import PageTitleComponent from "../../components/common/PageTitle";
import { deleteUser, fetchUser } from "../../services/user.service";
import {
  userDeleteState,
  userListCountState,
  userListFilterState,
  userListState,
} from "../../stores/user.store";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import UserCreateModal from "./components/UserCreateModal";
import UserListCard from "./components/UserListCard";
import UserUpdateModal from "./components/UserUpdateModal";

export default function UserPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "User Management",
    },
  ];
  const setUser = useSetRecoilState(userListState);
  const setRowCount = useSetRecoilState(userListCountState);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useRecoilState(userListFilterState);
  const [deletion, setDeletion] = useRecoilState(userDeleteState);
  const [qFilter] = useDebouncedValue(filter.q, 500);

  useEffect(() => {
    setIsLoading(true);
    fetchUser(filter)
      .then((res) => {
        setUser(res.data);
        setRowCount(res.rowCount);
      })
      .catch((e) => {
        showNotification({
          title: "Unable to Fetch",
          message: `Failed : ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filter.limit, filter.page, filter.refreshToggle, qFilter]);

  const closeDialog = () => {
    setDeletion((x) => ({ ...x, showModal: false }));
  };
  const submitDeletionHandler = () => {
    deleteUser(deletion.data)
      .then((res) => {
        showNotification({
          title: "User Deletion",
          message: `Success to Delete ${res.name}`,
          color: "green",
        });
        setFilter((x) => ({ ...x, refreshToggle: !x.refreshToggle }));
      })
      .catch((e) => {
        showNotification({
          title: "User Deletion",
          message: `Delete failed! ${e.message}`,
          color: "red",
        });
      });
    setDeletion((x) => ({ ...x, showModal: false }));
  };

  return (
    <>
      <PageTitleComponent title="User Management" breadcrumbs={breadcrumbs} />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={isLoading} />
        <UserListCard />
      </Box>
      <DeleteDialog
        open={deletion.showModal}
        onClose={closeDialog}
        data={deletion.data}
        onSubmit={submitDeletionHandler}
      />
      <UserCreateModal />
      <UserUpdateModal />
    </>
  );
}
