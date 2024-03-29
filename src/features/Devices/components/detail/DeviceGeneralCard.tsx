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
        value={device.name ?? ""}
      />
      <TextInput
        my={"sm"}
        label="Year"
        description="Purchasing Year"
        disabled
        value={device.year ?? ""}
      />
      <TextInput
        my={"sm"}
        label="Merk"
        description="Device Brand"
        disabled
        value={device.merk ?? ""}
      />
      <TextInput
        my={"sm"}
        label="Merk Type"
        description="Device Type / Series Brand"
        disabled
        value={device.merkType ?? ""}
      />
      <TextInput
        my={"sm"}
        label="Serial Number"
        description="Serial Number of this product"
        disabled
        value={device.serialNumber ?? ""}
      />
      <TextInput
        my={"sm"}
        label="Unit"
        description="Select unit where this device is located"
        disabled
        value={device.unit?.name ?? ""}
      />
      <Checkbox
        label="This Device is a spare"
        my={"md"}
        disabled
        checked={device.isSpare ?? false}
      />
      {!device.isSpare && (
        <TextInput
          disabled
          my={"sm"}
          label="IP Address"
          description="Input IP Address to monitor device"
          value={device.ipAddress ?? ""}
        />
      )}
      <Divider variant="dotted" my={"md"} />
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
