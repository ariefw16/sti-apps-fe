import {
  Button,
  Divider,
  Group,
  Modal,
  TextInput,
  Title,
  Box,
  Select,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { DeviceFloppy, Edit, X } from "tabler-icons-react";
import { z } from "zod";
import { fetchUnit } from "../../../services/unit.service";
import { updateUser } from "../../../services/user.service";
import {
  userListFilterState,
  userUpdateState,
} from "../../../stores/user.store";
import { UserUpdateData } from "../../../types/user.type";

const schema = z.object({
  name: z.string().min(1),
  nik: z.string().optional(),
  email: z.string().min(1).email(),
  username: z.string().min(1),
  password: z.string().optional(),
  unitId: z.string().optional(),
});

export default function UserUpdateModal() {
  const userEdit = useRecoilValue(userUpdateState);
  const closeModal = useResetRecoilState(userUpdateState);
  const [loading, setLoading] = useState(false);
  const setFilter = useSetRecoilState(userListFilterState);
  const form = useForm({
    initialValues: {
      name: "",
      nik: "",
      email: "",
      username: "",
      password: "",
      unitId: "",
    },
    schema: zodResolver(schema),
  });
  const [unit, setUnit] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    fetchUnit({ parentId: null })
      .then((res) => {
        setUnit(
          res.data.map((un) => ({ label: un.name!, value: un.id!.toString() }))
        );
      })
      .catch((e) => {
        showNotification({
          color: "red",
          title: "Fetch Unit",
          message: `Error! ${e.message}`,
        });
      });
  }, []);

  useEffect(() => {
    const data = userEdit.data;
    form.setFieldValue("name", data.name || "");
    form.setFieldValue("nik", data.nik || "");
    form.setFieldValue("email", data.email || "");
    form.setFieldValue("username", data.username || "");
    form.setFieldValue("unitId", data.unit?.id?.toString() || "");
  }, [userEdit.data]);

  const onSubmitHandler = (data: UserUpdateData) => {
    setLoading(true);
    updateUser({ ...data, id: userEdit.data.id })
      .then(() => {
        showNotification({
          title: "User Update",
          message: "Update Success!",
          color: "green",
        });
        setFilter((x) => ({ ...x, refreshToggle: !x.refreshToggle }));
        closeModal();
      })
      .catch((e) => {
        showNotification({
          title: "User Update",
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
      <Edit />
      <Title order={5}>Update Data : {userEdit.data.name}</Title>
    </Group>
  );

  return (
    <Modal
      padding={20}
      opened={userEdit.showModal}
      onClose={closeModal}
      title={<TitleModal />}
      overflow="inside"
      size={"lg"}
      withCloseButton={!loading}
      closeOnClickOutside={!loading}
      closeOnEscape={!loading}
      radius="lg"
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
            data={unit || []}
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
              onClick={closeModal}
              disabled={loading}
            >
              Discard
            </Button>
            <Button
              radius={"md"}
              rightIcon={<DeviceFloppy />}
              type="submit"
              loading={loading}
              loaderPosition="left"
            >
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
