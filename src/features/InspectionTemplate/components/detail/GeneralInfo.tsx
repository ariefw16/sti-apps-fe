import { Button, Divider, Group, Paper, TextInput, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ArrowLeft, Pencil } from "tabler-icons-react";
import { inspectionTemplateState } from "../../utils/store";

export default function InspectionTemplateGeneralDetail(props: {
  loading: boolean;
}) {
  const { loading } = props;
  const data = useRecoilValue(inspectionTemplateState);
  const navigate = useNavigate();

  const updateButtonHandler = () => {
    navigate(`/inspection-template/${data.id}/edit`);
  };

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <Paper radius={"lg"} p="lg">
        <Title order={5}>General Information</Title>
        <Divider my="md" variant="dotted" />
        <TextInput
          my="sm"
          label="Name"
          description="Form Inspection Checklist Specific name"
          disabled
          value={data.name ?? ""}
        />
        <TextInput
          my="sm"
          label="Device Type"
          description="Device Type to Apply this inspection"
          disabled
          value={data.deviceType?.name || ""}
        />
        <TextInput
          my="sm"
          label="Created By"
          description="User who create this form"
          disabled
          value={data.createdBy?.name || "-"}
        />
      </Paper>
      <Paper p={20} my={20} radius="lg">
        <Group position="apart">
          <Button
            color="orange"
            leftIcon={<ArrowLeft />}
            radius="md"
            loading={loading}
            onClick={backButtonHandler}
          >
            Back
          </Button>
          <Button
            loading={loading}
            rightIcon={<Pencil />}
            onClick={updateButtonHandler}
            radius={"md"}
            variant="outline"
            color={"green"}
          >
            Update
          </Button>
        </Group>
      </Paper>
    </>
  );
}
