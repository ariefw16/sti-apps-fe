import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Group,
  Loader,
  Modal,
  Select,
  SelectItemProps,
  TextInput,
  Text,
  AutocompleteItem,
  PasswordInput,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { forwardRef, useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { DeviceFloppy, X } from "tabler-icons-react";
import { findSettings } from "../../../services/settings.service";
import { fetchUser } from "../../../services/user.service";
import { createVPN } from "../../../services/vpn.service";
import { vpnCreateState } from "../../../stores/vpn.store";
import { Unit } from "../../../types/unit.type";
import { User } from "../../../types/user.type";

interface ItemProps extends SelectItemProps {
  name: string;
  nik?: string;
  email?: string;
  userId: number;
  unit?: Unit;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, name, nik, email, userId, unit, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>{name}</Text>
          <Text size="xs" color="dimmed">
            NIK : {nik} ({email})
          </Text>
        </div>
      </Group>
    </div>
  )
);

export default function VPNCreateModal() {
  const show = useRecoilValue(vpnCreateState).showModal;
  const closeModal = useResetRecoilState(vpnCreateState);
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [qSearch] = useDebouncedValue(search, 500);
  const [skipOnSelect, setSkipOnSelect] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [duration, setDuration] = useState<number | undefined>();
  const [interval, setInterval] = useState<string | null>("days");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (qSearch !== "") setUserLoading(true);
  }, [search]);

  useEffect(() => {
    if (qSearch === "") setUser([]);
    else if (!skipOnSelect) {
      setUserData(undefined);
      fetchUser({ q: search, unitId: null })
        .then((res) => {
          setUser(res.data);
        })
        .catch((e) => {
          showNotification({
            title: "Fetch User Failed",
            message: `Error! ${e.message}`,
            color: "red",
          });
        });
    }
    setUserLoading(false);
    setSkipOnSelect(false);
  }, [qSearch]);

  useEffect(() => {
    findSettings("vpn-reminder")
      .then((res) => {
        setDuration(res.value ? +res.value : undefined);
        setInterval(res.params || null);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Default Setting",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  }, []);

  const onSelectItemHandler = (item: AutocompleteItem) => {
    const { name, nik, email, userId: id, unit } = item;
    setSkipOnSelect(true);
    setUserData({ id, name, nik, email, unit });
  };

  const onSubmitFormHandler = () => {
    if (!userData?.id)
      showNotification({
        title: "Creation Failed",
        message: "Please choose User to create!",
        color: "red",
      });
    else {
      setLoading(true);
      createVPN({
        username,
        password,
        userId: userData?.id.toString(),
        duration: duration?.toString(),
        durationVariant: interval!,
      })
        .then((res) => {
          showNotification({
            title: "Creation Success!",
            message: `Creation VPN for ${res.user?.name} is done`,
            color: "green",
          });
          closeModal();
        })
        .catch((e) => {
          showNotification({
            title: "Creation Failed!",
            message: `Error! ${e.message}`,
            color: "red",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Modal
      opened={show}
      onClose={closeModal}
      title="Create new VPN"
      size="lg"
      radius="lg"
      overflow="inside"
      withCloseButton={!isLoading}
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}
    >
      <Box p={20}>
        <form>
          <Autocomplete
            data={user.map((us) => ({
              value: us.name!,
              name: us.name,
              nik: us.nik,
              email: us.email,
              userId: us.id,
              unit: us.unit,
            }))}
            label="User"
            placeholder="NIK / Nama"
            required
            description="Type Name or NIK to Choose User"
            pb={15}
            rightSection={userLoading ? <Loader size={16} /> : null}
            value={search}
            onChange={setSearch}
            itemComponent={AutoCompleteItem}
            nothingFound="No Data Found"
            filter={(value, item) =>
              item.name.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.nik.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.email.toLowerCase().includes(value.toLowerCase().trim())
            }
            onItemSubmit={onSelectItemHandler}
          />
          <TextInput
            label="NIK"
            radius={"md"}
            description="NIK PLN Group"
            disabled
            pb={15}
            value={userData?.nik || ""}
            onChange={() => {}}
          />
          <TextInput
            disabled
            label="Email"
            radius={"md"}
            description="User Email Corporate"
            pb={15}
            value={userData?.email || ""}
            onChange={() => {}}
          />
          <TextInput
            disabled
            label="Unit"
            radius={"md"}
            description="User's Location Unit"
            pb={15}
            value={userData?.unit?.name || ""}
            onChange={() => {}}
          />
          <TextInput
            label="Username"
            required
            radius={"md"}
            description="Enter Username for VPN sign in"
            placeholder="VPN Username"
            pb={15}
            value={username}
            onChange={(x) => {
              setUsername(x.target.value);
            }}
          />
          <PasswordInput
            label="Password"
            required
            radius={"md"}
            description="Enter Password for VPN sign in"
            placeholder="VPN Password"
            pb={15}
            onChange={(x) => {
              setPassword(x.target.value);
            }}
            value={password}
            autoComplete="on"
          />
          <TextInput
            label="VPN Duration"
            rightSection={
              <Select
                data={["days", "week", "month"]}
                value={interval}
                onChange={(x) => {
                  setInterval(x);
                }}
              />
            }
            rightSectionWidth={130}
            pb={15}
            value={duration || ""}
            onChange={(v) => {
              setDuration(+v.target.value);
            }}
          />
          <Divider my={20} />
          <Group position="right">
            <Button
              radius={"md"}
              variant="subtle"
              color={"orange"}
              leftIcon={<X />}
              onClick={closeModal}
              loading={isLoading}
            >
              Discard
            </Button>
            <Button
              radius={"md"}
              rightIcon={<DeviceFloppy />}
              onClick={onSubmitFormHandler}
              loading={isLoading}
            >
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
