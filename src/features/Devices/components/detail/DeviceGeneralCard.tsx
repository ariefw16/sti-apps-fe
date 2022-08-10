import {
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ArrowLeft, Pencil } from "tabler-icons-react";
import { deviceDetailState } from "../../utils/store";

export default function DeviceGeneralCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const device = useRecoilValue(deviceDetailState);
  return (
    <Paper p={20} radius="lg">
      <Title order={5}>General Information</Title>
      <Divider my={"md"} variant="dotted" />
      <TextInput
        my={"sm"}
        label="Name"
        description="Input Device Name here.."
        disabled
        defaultValue={device.name}
      />
      <TextInput
        my={"sm"}
        label="Unit"
        description="Select unit where this device is located"
        disabled
        defaultValue={device.unit?.name}
      />
      <Checkbox
        label="This Device is a spare"
        my={"md"}
        disabled
        defaultChecked={device.isSpare}
      />
      {!device.isSpare && (
        <TextInput
          disabled
          my={"sm"}
          label="IP Address"
          description="Input IP Address to monitor device"
          defaultValue={device.ipAddress}
        />
      )}
      <Divider variant="dotted" my={"md"} defaultChecked={device.isSpare} />
      <Group position="apart">
        <Button
          color={"orange"}
          leftIcon={<ArrowLeft />}
          radius="md"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            navigate(`/device/${id}/edit`);
          }}
          radius={"md"}
          rightIcon={<Pencil />}
        >
          Quick Update
        </Button>
      </Group>
    </Paper>
  );
}
