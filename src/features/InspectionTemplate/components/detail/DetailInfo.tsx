import { Button, Divider, Group, Paper, Table, Title } from "@mantine/core";
import { Plus } from "tabler-icons-react";

export default function InspectionTemplateLineDetail() {
  return (
    <Paper radius="lg" p="lg">
      <Group position="apart">
        <Title order={5}>Checklist</Title>
        <Button size="xs" variant="outline" leftIcon={<Plus />} px={10}>
          Add Checklist
        </Button>
      </Group>
      <Divider my="md" variant="dotted" />
      <Table>
        <thead>
          <tr>
            <th style={{ width: "10%" }}>No.</th>
            <th style={{ width: "50%" }}>Item</th>
            <th>Input Type</th>
            <th>Actions</th>
          </tr>
        </thead>
      </Table>
    </Paper>
  );
}
