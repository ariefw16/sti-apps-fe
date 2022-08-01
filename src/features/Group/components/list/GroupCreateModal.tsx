import { Divider, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import GroupButtonModal from "../../../../components/common/GroupButtonModal";
import { saveGroup } from "../../utils/service";
import { groupCreateState, groupListFilterState } from "../../utils/store";
import { Group } from "../../utils/type";

export default function GroupCreateModal() {
  const creation = useRecoilValue(groupCreateState);
  const resetCreation = useResetRecoilState(groupCreateState);
  const [isLoading, setLoading] = useState(false);
  const setFilter = useSetRecoilState(groupListFilterState);
  const form = useForm<Group>({
    initialValues: {
      name: "",
      initial: "",
    },
  });

  const submitHandler = (data: Group) => {
    setLoading(true);
    saveGroup(data)
      .then(() => {
        setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
        showNotification({
          title: "Group Creation",
          message: "Creation Group Succes!",
          color: "green",
        });
        resetCreation();
      })
      .catch((e) => {
        showNotification({
          title: "Group Creation",
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
      opened={creation.showModal}
      onClose={resetCreation}
      radius="lg"
      title="Group User Creation"
      withCloseButton={!isLoading}
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}
    >
      <form onSubmit={form.onSubmit(submitHandler)}>
        <TextInput
          label="Group Name"
          required
          placeholder="ex: Administrator"
          description="Enter Group Name here .."
          my={"sm"}
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Initial"
          required
          placeholder="ex: ADMINISTRATOR"
          description="Initial for App Code"
          {...form.getInputProps("initial")}
        />
        <Divider my={20} />
        <GroupButtonModal onDiscard={resetCreation} loading={isLoading} />
      </form>
    </Modal>
  );
}
