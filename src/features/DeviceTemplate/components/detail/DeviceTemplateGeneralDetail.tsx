import { Divider, Grid, Loader, Paper, TextInput, Title } from "@mantine/core";
import { useRecoilValue } from "recoil";
import {
  deviceTemplateDetailState,
  deviceTemplateLoadingDetailState,
} from "../../utils/store";

export default function DeviceTemplateGeneralInfoDetail() {
  const template = useRecoilValue(deviceTemplateDetailState);
  const loading = useRecoilValue(deviceTemplateLoadingDetailState);

  return (
    <Grid>
      <Grid.Col sm={12} lg={8}>
        <Paper p={20} radius={"lg"} mt={20}>
          <Title order={5}>General Information</Title>
          <Divider my={"md"} variant="dotted" />
          <TextInput
            my={"sm"}
            label="Name"
            readOnly
            variant="filled"
            rightSection={loading ? <Loader size={16} /> : null}
            description="Device Template Name, applied to all device"
            defaultValue={template.name || ""}
          />
          <TextInput
            my={"sm"}
            label="Device Type"
            readOnly
            variant="filled"
            rightSection={loading ? <Loader size={16} /> : null}
            description="Type of device for this template"
            defaultValue={template.deviceType?.name || ""}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col lg={4} sm={12}>
        <Paper p={20} radius={"lg"} mt={20}>
          <Title order={5}>Specifications</Title>
          <Divider my={"md"} variant="dotted" />
          {template.DeviceTemplateSpecs &&
            template.DeviceTemplateSpecs.map((x) => (
              <TextInput
                key={x.id}
                my={"sm"}
                label={x.name}
                readOnly
                variant="filled"
                rightSection={loading ? <Loader size={16} /> : null}
                defaultValue={x.value}
              />
            ))}
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
