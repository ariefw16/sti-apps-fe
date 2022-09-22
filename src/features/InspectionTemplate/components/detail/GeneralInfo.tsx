import { Divider, Paper, TextInput, Title } from "@mantine/core";

export default function InspectionTemplateGeneralDetail() {
  return (
    <Paper radius={"lg"} p="lg">
      <Title order={5}>General Information</Title>
      <Divider my="md" variant="dotted" />
      <TextInput
        my="sm"
        label="Name"
        description="Form Inspection Checklist Specific name"
        disabled
      />
      <TextInput
        my="sm"
        label="Device Type"
        description="Device Type to Apply this inspection"
        disabled
      />
      <TextInput
        my="sm"
        label="Created By"
        description="User who create this form"
        disabled
      />
    </Paper>
  );
}
