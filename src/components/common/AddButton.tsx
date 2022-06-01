import { Button } from "@mantine/core";
import { Plus } from "tabler-icons-react";

export default function AddButton(props: { onClick: any }) {
  const { onClick } = props;
  return (
    <Button
      leftIcon={<Plus />}
      size="md"
      style={{ paddingLeft: 10, paddingRight: 15 }}
      radius="md"
      sx={(theme) => ({ fontFamily: theme.fontFamily })}
      onClick={onClick}
    >
      Add
    </Button>
  );
}
