import {
  Button,
  Divider,
  Grid,
  Group,
  Loader,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ArrowLeft, Pencil } from "tabler-icons-react";
import {
  deviceTemplateDetailState,
  deviceTemplateLoadingDetailState,
} from "../../utils/store";

export default function DeviceTemplateGeneralInfoDetail() {
  const template = useRecoilValue(deviceTemplateDetailState);
  const loading = useRecoilValue(deviceTemplateLoadingDetailState);
  const navigate = useNavigate();
  const { id } = useParams();

  const backButtonHandler = () => {
    navigate(-1);
  };
  const updateButtonHandler = () => {
    navigate(`/device-template/${id}/edit`);
  };

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
            value={template.name || ""}
          />
          <TextInput
            my={"sm"}
            label="Merk"
            readOnly
            variant="filled"
            rightSection={loading ? <Loader size={16} /> : null}
            description="Device Brand"
            value={template.merk || ""}
          />
          <TextInput
            my={"sm"}
            label="Device Type"
            readOnly
            variant="filled"
            rightSection={loading ? <Loader size={16} /> : null}
            description="Type of device for this template"
            value={template.deviceType?.name || ""}
          />
          <Divider my={"md"} variant="dotted" />
          <Group position="apart">
            <Button
              onClick={backButtonHandler}
              color="orange"
              leftIcon={<ArrowLeft />}
              radius="md"
            >
              Back
            </Button>
            <Button
              rightIcon={<Pencil />}
              radius={"md"}
              onClick={updateButtonHandler}
            >
              Update
            </Button>
          </Group>
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
                value={x.value ?? ""}
              />
            ))}
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
