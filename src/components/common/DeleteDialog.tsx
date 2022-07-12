import { Box, Button, Group, Modal, Title } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import { DataToDelete } from "../../types/common";

export default function DeleteDialog(props: {
  open: boolean;
  onClose: any;
  data: DataToDelete;
  onSubmit: any;
  loading?: boolean
}) {
  const { open, onClose, data, onSubmit, loading = false } = props;
  return (
    <Modal
      opened={open}
      onClose={onClose}
      withCloseButton={false}
      closeOnEscape={!loading}
      closeOnClickOutside={!loading}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Group position="center">
          <AlertCircle size={150} color="orange" />
        </Group>
        <Group position="center">
          <Title order={6} sx={(theme) => ({ fontFamily: theme.fontFamily })}>
            Are you sure to delete <i>( {data.name} )</i> record ?
          </Title>
        </Group>
        <Group position="center" sx={{ marginTop: 30 }}>
          <Button color="red" onClick={onSubmit} loading={loading}>
            Yes, Delete it!
          </Button>
          <Button variant="light" color={"indigo"} loading={loading} onClick={onClose}>
            No! Cancel
          </Button>
        </Group>
      </Box>
    </Modal>
  );
}
