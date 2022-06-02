import {
  Box,
  Button,
  Divider,
  Group,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { DeviceFloppy, X } from "tabler-icons-react";
import { findSettings } from "../../Settings/utils/service";
import { extendsVPN } from "../utils/service";
import { vpnExtendState, vpnListFilterState } from "../utils/store";

export default function VPNExtendModal() {
  const extendsData = useRecoilValue(vpnExtendState);
  const resetState = useResetRecoilState(vpnExtendState);
  const [duration, setDuration] = useState<number | undefined>();
  const [interval, setInterval] = useState<string | null>("days");
  const [isLoading, setLoading] = useState(false);
  const setFilter = useSetRecoilState(vpnListFilterState);

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

  const onSubmitHandler = () => {
    setLoading(true);
    const { id } = extendsData.data;
    extendsVPN({
      id: id!,
      duration: duration!,
      durationVariant: interval!,
    })
      .then(() => {
        showNotification({
          title: "Extend Success!",
          message: "Duration VPN is Extended!",
          color: "green",
        });
        resetState();
        setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
      })
      .catch((e) => {
        showNotification({
          title: "Extend Failed!",
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
      title={`Add VPN Duration for User <${extendsData.data.user?.name}>`}
      opened={extendsData.showModal}
      onClose={resetState}
      withCloseButton={!isLoading}
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}
      size={"sm"}
    >
      <Box pt={20}>
        <TextInput
          label="Extends VPN Duration"
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
        <Divider my={10} />
        <Group position="right">
          <Button
            radius={"md"}
            variant="subtle"
            color={"orange"}
            leftIcon={<X />}
            onClick={resetState}
            loading={isLoading}
          >
            Discard
          </Button>
          <Button
            radius={"md"}
            rightIcon={<DeviceFloppy />}
            onClick={onSubmitHandler}
            loading={isLoading}
          >
            Submit
          </Button>
        </Group>
      </Box>
    </Modal>
  );
}
