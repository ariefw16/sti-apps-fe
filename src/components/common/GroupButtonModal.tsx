import { Group, Button } from "@mantine/core";
import { X, DeviceFloppy } from "tabler-icons-react";

export default function GroupButtonModal(props: {
  onDiscard: any;
  loading: boolean;
}) {
  const { onDiscard, loading } = props;
  return (
    <Group position="apart">
      <Button
        radius={"md"}
        variant="subtle"
        color={"orange"}
        leftIcon={<X />}
        onClick={onDiscard}
        loading={loading}
      >
        Discard
      </Button>
      <Button
        radius={"md"}
        rightIcon={<DeviceFloppy />}
        type="submit"
        loading={loading}
      >
        Submit
      </Button>
    </Group>
  );
}
