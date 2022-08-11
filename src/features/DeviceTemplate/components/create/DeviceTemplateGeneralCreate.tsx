import { Divider, Grid, Paper, Title } from "@mantine/core";

export default function DeviceTemplateGeneralCreate() {
  return (
    <Grid mt={50}>
      <Grid.Col sm={12} lg={7}>
        <Paper p={20} radius="lg">
          <Title order={5}>General Information</Title>
          <Divider my={"md"} variant="dotted" />
        </Paper>
      </Grid.Col>
      <Grid.Col sm={12} lg={5}>
        <Paper p={20} radius="lg">
          <Title order={5}>Specifications</Title>
          <Divider my={"md"} variant="dotted" />
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
