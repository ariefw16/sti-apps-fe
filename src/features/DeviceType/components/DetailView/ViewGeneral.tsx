import { Paper, Title, Divider, TextInput, Group, Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Trash, Pencil, DeviceFloppy, X } from "tabler-icons-react";
import { z } from "zod";
import GroupButtonModal from "../../../../components/common/GroupButtonModal";
import { updateSimpleDeviceType } from "../../utils/service";
import { deviceTypeDeleteModalState, deviceTypeState } from "../../utils/store";
import { DeviceType } from "../../utils/type";

const schema = z.object({ name: z.string().min(3) });

export default function ViewGeneralDeviceType() {
  const setDeletiion = useSetRecoilState(deviceTypeDeleteModalState);
  const [deviceType, setDeviceType] = useRecoilState(deviceTypeState);
  const [isView, setView] = useState(true);
  const [loading, setLoading] = useState(false);
  const form = useForm<DeviceType>({
    initialValues: { name: "" },
    schema: zodResolver(schema),
  });

  useEffect(() => {
    form.setFieldValue("name", deviceType.name);
  }, [isView]);

  const deleteButtonHandler = () => {
    setDeletiion({
      showModal: true,
      data: { id: deviceType.id!, name: deviceType.name! },
    });
  };
  const submitHandler = (data: DeviceType) => {
    setLoading(true);
    updateSimpleDeviceType({ ...data, id: deviceType.id! })
      .then((res) => {
        showNotification({
          title: "Update Device Type",
          message: "Update data success!",
          color: "green",
        });
        setDeviceType((x) => ({ ...x, name: res.name }));
        setView(true);
      })
      .catch((e) => {
        showNotification({
          title: "Update Device Type",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Paper p={"lg"} radius="lg">
      <Title order={4}>General</Title>
      <Divider my={10} variant="dotted" />
      {isView && (
        <>
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
            <Button
              leftIcon={<Pencil />}
              radius="md"
              onClick={() => {
                setView(false);
              }}
            >
              Update
            </Button>
          </Group>
        </>
      )}
      {!isView && (
        <form onSubmit={form.onSubmit(submitHandler)}>
          <TextInput
            label="Name"
            description="Device Type Name"
            {...form.getInputProps("name")}
          />
          <Divider my={10} variant="dotted" />
          <GroupButtonModal
            loading={loading}
            onDiscard={() => {
              setView(true);
            }}
          />
        </form>
      )}
    </Paper>
  );
}
