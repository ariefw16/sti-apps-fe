import {
  Button,
  Divider,
  Group,
  Paper,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ArrowLeft, DeviceFloppy } from "tabler-icons-react";
import { z } from "zod";
import { SelectOptions } from "../../../../types/common";
import { fetchDeviceType } from "../../../DeviceType/utils/service";
import { updateInspectionTemplate } from "../../utils/service";
import { inspectionTemplateState } from "../../utils/store";
import { CreateInspectionTemplate, InspectionTemplate } from "../../utils/type";

const schema = z.object({
  name: z.string().min(1),
  deviceTypeId: z.string().min(1),
});
export default function InspectionTemplateGeneralEdit(props: {
  loading: boolean;
}) {
  const { loading } = props;
  const navigate = useNavigate();
  const data = useRecoilValue(inspectionTemplateState);
  const form = useForm<CreateInspectionTemplate>({
    initialValues: {
      name: "",
      deviceTypeId: "",
    },
    schema: zodResolver(schema),
  });
  const [typeSelection, setTypeSelection] = useState<SelectOptions[]>([]);

  useEffect(() => {
    form.setFieldValue("name", data.name ?? "");
    form.setFieldValue("deviceTypeId", data.deviceTypeId?.toString() ?? "");
  }, [data]);

  useEffect(() => {
    fetchDeviceType({})
      .then((res) => {
        setTypeSelection(
          res.data.map((dt) => ({ label: dt.name!, value: dt.id!.toString() }))
        );
      })
      .catch((e) => {
        showNotification({
          title: "Fetch DeviceType",
          message: `Error! ${e.message}`,
        });
      });
  }, []);

  const backButtonHandler = () => {
    navigate(-1);
  };
  const submitFormHandler = (params: CreateInspectionTemplate) => {
    updateInspectionTemplate(+data.id!, params)
      .then(() => {
        showNotification({
          title: "Update Device Template",
          message: "Device Inspection Template Updated successfully!",
          color: "green",
        });
        navigate(`/inspection-template/${data.id}`);
      })
      .catch((e) => {
        showNotification({
          title: "Update Device Template",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

  return (
    <>
      <form onSubmit={form.onSubmit(submitFormHandler)}>
        <Paper radius={"lg"} p="lg">
          <Title order={5}>General Information</Title>
          <Divider my="md" variant="dotted" />
          <TextInput
            my="sm"
            label="Name"
            description="Form Inspection Checklist Specific name"
            {...form.getInputProps("name")}
          />
          <Select
            data={typeSelection || []}
            placeholder="Select Options"
            label="Device Type :"
            sx={{ width: 300 }}
            radius="md"
            {...form.getInputProps("deviceTypeId")}
          />
          <TextInput
            my="sm"
            label="Created By"
            description="User who create this form"
            disabled
            value={data.createdBy?.name || ""}
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
              variant="outline"
            >
              Back
            </Button>
            <Button
              loading={loading}
              rightIcon={<DeviceFloppy />}
              radius={"md"}
              variant="filled"
              color={"green"}
              type="submit"
            >
              Save
            </Button>
          </Group>
        </Paper>
      </form>
    </>
  );
}
