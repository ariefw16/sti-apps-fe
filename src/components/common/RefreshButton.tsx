import { Button } from "@mantine/core";
import { Refresh } from "tabler-icons-react";

export default function RefreshButton(props: { onClick: any }) {
  const { onClick } = props;

  return (
    <Button
      size="md"
      radius={"md"}
      sx={{ paddingRight: 5, paddingLeft: 5 }}
      variant="light"
      color={"green"}
      onClick={onClick}
    >
      <Refresh />
    </Button>
  );
}
