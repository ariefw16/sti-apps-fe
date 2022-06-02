import {
  Box,
  Button,
  Divider,
  Group,
  Modal,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { DeviceFloppy, UserPlus, X } from "tabler-icons-react";
import { z } from "zod";
import { fetchUnit } from "../../Unit/utils/service";
import { createUser } from "../utils/service";
import { userCreateState, userListFilterState } from "../utils/store";
import { UserCreateData } from "../utils/type";

const schema = z.object({
  name: z.string().min(1),
  nik: z.string().optional(),
  email: z.string().min(1).email(),
  username: z.string().min(1),
  password: z.string().optional(),
  unitId: z.string().optional(),
});

export default function UserCreateModal() {
  const [unit, setUnit] = useState<{ id: string; name: string }[]>();
  const [loading, setLoading] = useState(false);
  const form = useForm<UserCreateData>({
    schema: zodResolver(schema),
    initialValues: {
      name: "",
      nik: "",
      email: "",
      username: "",
      password: "",
      unitId: "",
    },
  });
  const closeCreate = useResetRecoilState(userCreateState);
  const open = useRecoilValue(userCreateState).showModal;
  const setFilter = useSetRecoilState(userListFilterState);

  useEffect(() => {
    fetchUnit({ parentId: null, limit: 0 })
      .then((res) => {
        setUnit(
          res.data.map((unit) => ({
            id: unit.id!.toString(),
            name: unit.name!,
          }))
        );
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Unit",
          message: e.message,
          color: "red",
        });
      });
  }, []);

  useEffect(() => {
    if (open) form.reset();
  }, [open]);

  const onSubmitHandler = (data: UserCreateData) => {
    setLoading(true);
    createUser(data)
      .then(() => {
        setFilter((x) => ({ ...x, refreshToggle: !x.refreshToggle }));
        showNotification({
          message: "User Creation Success!",
          title: "User Created",
          color: "green",
        });
        closeCreate();
      })
      .catch((e) => {
        showNotification({
          title: "User Creation",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const TitleModal = () => (
    <Group position="left">
      <UserPlus />
      <Title order={5}>Create New User</Title>
    </Group>
  );

  return (
    <Modal
      onClose={closeCreate}
      opened={open}
      title={<TitleModal />}
      withCloseButton
      size="lg"
      overflow="inside"
      radius={"lg"}
    >
      <Box p={20}>
        <form onSubmit={form.onSubmit(onSubmitHandler)}>
          <TextInput
            label="Name"
            required
            radius={"md"}
            placeholder="Nama User"
            description="Enter the name of User here"
            my={20}
            disabled={loading}
            {...form.getInputProps("name")}
          />
          <TextInput
            label="NIK"
            radius={"md"}
            placeholder="NIK"
            description="Enter NIK if PLN Employee"
            my={20}
            disabled={loading}
            {...form.getInputProps("nik")}
          />
          <TextInput
            label="Email"
            radius={"md"}
            placeholder="Email Pegawai"
            description="You can fill corporate email or not here"
            my={20}
            disabled={loading}
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Username"
            radius={"md"}
            placeholder="Username"
            description="Use to Login. fill with SSO username (without pusat\) to login with corporate password"
            my={20}
            disabled={loading}
            {...form.getInputProps("username")}
          />
          <TextInput
            label="Password"
            radius={"md"}
            placeholder="Password"
            description="Enter Password, skip if using SSO / mail corporate login"
            my={20}
            type="password"
            disabled={loading}
            autoComplete="on"
            {...form.getInputProps("password")}
          />
          <Select
            data={unit?.map((un) => ({ value: un.id, label: un.name })) || []}
            label="Unit"
            placeholder="Select Unit"
            description="Select unit where user belongs to"
            searchable
            filter={(val, item) =>
              item.label?.toLowerCase().includes(val.toLowerCase().trim()) ||
              false
            }
            nothingFound="No data found"
            disabled={loading}
            {...form.getInputProps("unitId")}
          />
          <Divider my={20} />
          <Group position="apart">
            <Button
              radius={"md"}
              variant="subtle"
              color={"orange"}
              leftIcon={<X />}
              onClick={closeCreate}
            >
              Discard
            </Button>
            <Button radius={"md"} rightIcon={<DeviceFloppy />} type="submit">
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
