import { Divider, Modal, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { groupListFilterState, groupUpdateState } from "../../utils/store";
import { useForm } from "@mantine/hooks";
import { Group } from "../../utils/type";
import GroupButtonModal from "../../../../components/common/GroupButtonModal";
import { fetchSingleGroup, updateGroup } from "../../utils/service";
import { showNotification } from "@mantine/notifications";

export default function GroupUpdateModal() {
  const updation = useRecoilValue(groupUpdateState);
  const resetUpdation = useResetRecoilState(groupUpdateState);
  const [loading, setLoading] = useState(false);
  const setFilter = useSetRecoilState(groupListFilterState);
  const form = useForm<Group>({
    initialValues: {
      name: "",
      initial: "",
    },
  });

  useEffect(() => {
    if (updation.showModal)
      fetchSingleGroup(updation.data.id!).then((res) => {
        form.setFieldValue("name", res.name || "");
        form.setFieldValue("initial", res.initial || "");
      });
  }, [updation.showModal]);

  const submitHandler = (data: Group) => {
    setLoading(true);
    updateGroup(updation.data.id!, data)
      .then(() => {
        setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
        resetUpdation();
        showNotification({
          title: "Group Updation",
          message: "Update Group User success!",
          color: "green",
        });
      })
      .catch((e) => {
        showNotification({
          title: "Group Updation",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      opened={updation.showModal}
      onClose={resetUpdation}
      radius="lg"
      title="Group User Update"
      withCloseButton={!loading}
      closeOnClickOutside={!loading}
      closeOnEscape={!loading}
    >
      <form onSubmit={form.onSubmit(submitHandler)}>
        <TextInput
          label="Group Name"
          required
          placeholder="ex: Administrator"
          description="Enter Group Name here .."
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Initial"
          required
          placeholder="ex: ADMINISTRATOR"
          description="Enter Initial here... for app code"
          {...form.getInputProps("initial")}
        />
        <Divider my={20} />
        <GroupButtonModal onDiscard={resetUpdation} loading={loading} />
      </form>
    </Modal>
  );
}
