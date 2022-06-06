import { Paper, Title, Divider, TextInput, Group, Button } from "@mantine/core";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Trash, Pencil } from "tabler-icons-react";
import { deviceTypeDeleteModalState, deviceTypeState } from "../../utils/store";

export default function ViewGeneralDeviceType() {
  const setDeletiion = useSetRecoilState(deviceTypeDeleteModalState);
  const deviceType = useRecoilValue(deviceTypeState);

  const deleteButtonHandler = () => {
    setDeletiion({
      showModal: true,
      data: { id: deviceType.id!, name: deviceType.name! },
    });
  };

  return (
    <Paper p={"lg"} radius="lg">
      <Title order={4}>General</Title>
      <Divider my={10} variant="dotted" />
      <TextInput
        label="Name"
        description="Device Type Name"
        disabled
        variant="filled"
        value={deviceType.name || ""}
      />
      <Divider my={10} variant="dotted" />
      <Group position="right">
        <Button
          leftIcon={<Trash />}
          color="red"
          variant="subtle"
          onClick={deleteButtonHandler}
          radius="lg"
        >
          Delete
        </Button>
        <Button leftIcon={<Pencil />} radius="md">
          Update
        </Button>
      </Group>
    </Paper>
  );
}
