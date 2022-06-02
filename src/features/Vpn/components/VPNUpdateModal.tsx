import {
  Button,
  Divider,
  Group,
  Modal,
  PasswordInput,
  Select,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { DeviceFloppy, X } from "tabler-icons-react";
import { updateVPN } from "../utils/service";
import { vpnListFilterState, vpnUpdateState } from "../utils/store";

export default function VPNUpdateModal() {
  const updation = useRecoilValue(vpnUpdateState);
  const resetUpdation = useResetRecoilState(vpnUpdateState);
  const setFilter = useSetRecoilState(vpnListFilterState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setUsername(updation.data.username || "");
  }, [updation.showModal]);

  const onSubmitFormHandler = () => {
    setLoading(true);
    updateVPN({
      id: updation.data.id,
      username,
      password: password !== "" ? password : undefined,
    })
      .then(() => {
        showNotification({
          title: "Update VPN",
          message: "Updating is Done!",
          color: "green",
        });
        setLoading(false);
        resetUpdation();
        setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
      })
      .catch((e) => {
        showNotification({
          title: "Update VPN",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

  return (
    <Modal
      opened={updation.showModal}
      onClose={resetUpdation}
      title="Update VPN Data"
      size={"lg"}
      radius="lg"
      overflow="inside"
      withCloseButton={!isLoading}
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}
    >
      <TextInput
        label="NIK"
        radius={"md"}
        description="NIK PLN Group"
        disabled
        pb={15}
        value={updation.data.user?.nik || ""}
        onChange={() => {}}
      />
      <TextInput
        disabled
        label="Email"
        radius={"md"}
        description="User Email Corporate"
        pb={15}
        value={updation.data.user?.email || ""}
        onChange={() => {}}
      />
      <TextInput
        disabled
        label="Unit"
        radius={"md"}
        description="User's Location Unit"
        pb={15}
        value={updation.data.user?.unit?.name || ""}
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
            defaultValue={updation.data.durationVariant}
            disabled
          />
        }
        rightSectionWidth={130}
        pb={15}
        value={updation.data.duration || ""}
        disabled
      />
      <Divider my={20} />
      <Group position="right">
        <Button
          radius={"md"}
          variant="subtle"
          color={"orange"}
          leftIcon={<X />}
          onClick={resetUpdation}
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
    </Modal>
  );
}
