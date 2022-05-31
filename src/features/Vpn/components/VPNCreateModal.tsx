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
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { forwardRef, useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { DeviceFloppy, X } from "tabler-icons-react";
import { fetchUser } from "../../../services/user.service";
import { vpnCreateState } from "../../../stores/vpn.store";
import { User } from "../../../types/user.type";

interface ItemProps extends SelectItemProps {
  name: string;
  nik?: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, name, nik, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>{name}</Text>
          <Text size="xs" color="dimmed">
            NIK : {nik}
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

  useEffect(() => {
    if (qSearch !== "") setUserLoading(true);
  }, [search]);

  useEffect(() => {
    if (qSearch === "") setUser([]);
    else
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
        })
        .finally(() => {
          setUserLoading(false);
        });
  }, [qSearch]);

  return (
    <Modal
      opened={show}
      onClose={closeModal}
      title="Create new VPN"
      size="lg"
      radius="lg"
      overflow="inside"
    >
      <Box p={20}>
        <form>
          <Autocomplete
            data={user.map((us) => ({
              value: us.id.toString(),
              name: us.name,
              nik: us.nik,
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
              item.nik.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
          <TextInput
            label="NIK"
            radius={"md"}
            description="NIK PLN Group"
            disabled
            pb={15}
          />
          <TextInput
            disabled
            label="Email"
            radius={"md"}
            description="User Email Corporate"
            pb={15}
          />
          <TextInput
            disabled
            label="Unit"
            radius={"md"}
            description="User's Location Unit"
            pb={15}
          />
          <TextInput
            label="Username"
            required
            radius={"md"}
            description="Enter Username for VPN sign in"
            placeholder="VPN Username"
            pb={15}
          />
          <TextInput
            label="Password"
            type="password"
            autoComplete="on"
            required
            radius={"md"}
            description="Enter Password for VPN sign in"
            placeholder="VPN Password"
            pb={15}
          />
          <TextInput
            label="VPN Duration"
            rightSection={
              <Select data={["days", "week", "month"]} defaultValue="days" />
            }
            rightSectionWidth={130}
            pb={15}
          />
          <Divider my={20} />
          <Group position="right">
            <Button
              radius={"md"}
              variant="subtle"
              color={"orange"}
              leftIcon={<X />}
              onClick={closeModal}
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
