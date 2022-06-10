import {
  Paper,
  Title,
  Divider,
  TextInput,
  Group,
  Button,
  Checkbox,
  Select,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { DeviceFloppy, X } from "tabler-icons-react";
import { z } from "zod";
import { SelectOptions } from "../../../../types/common";
import { fetchUnit } from "../../../Unit/utils/service";
import { updateDevice } from "../../utils/service";
import { deviceDetailState } from "../../utils/store";
import { CreateDevice } from "../../utils/type";

const schema = z.object({
  name: z.string().min(3),
});

export default function DeviceGeneralEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const device = useRecoilValue(deviceDetailState);
  const resetDevice = useResetRecoilState(deviceDetailState);
  const [unitOptions, setUnitOptions] = useState<SelectOptions[]>([]);
  const form = useForm<CreateDevice>({
    initialValues: {
      name: "",
      ipAddress: "",
      unitId: "",
      isSpare: false,
    },
    schema: zodResolver(schema),
  });

  useEffect(() => {
    form.setFieldValue("name", device.name || "");
    form.setFieldValue("ipAddress", device.ipAddress || "");
    form.setFieldValue(
      "unitId",
      device.unit && device.unit.id ? device.unit.id.toString() : ""
    );
    form.setFieldValue("isSpare", device.isSpare);
  }, [device]);

  useEffect(() => {
    fetchUnit({ parentId: null })
      .then((res) => {
        setUnitOptions(
          res.data.map((un) => ({ label: un.name!, value: un.id!.toString() }))
        );
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Unit",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  }, []);

  const submitFormHandler = (data: CreateDevice) => {
    updateDevice({ ...data, id: +id! })
      .then((res) => {
        showNotification({
          title: "Update Device",
          message: "Update Data device success!",
          color: "green",
        });
        resetDevice();
        navigate(`/device/${id}`);
      })
      .catch((e) => {
        showNotification({
          title: "Update Device",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

  return (
    <Paper p={20} radius="lg">
      <form onSubmit={form.onSubmit(submitFormHandler)}>
        <Title order={5}>General Information</Title>
        <Divider my={"md"} variant="dotted" />
        <TextInput
          my={"sm"}
          label="Name"
          description="Input Device Name here.."
          required
          {...form.getInputProps("name")}
        />
        <Select
          my={"sm"}
          label="Unit"
          description="Select unit where this device is located"
          data={unitOptions}
          required
          {...form.getInputProps("unitId")}
        />
        <Checkbox
          label="This Device is a spare"
          my={"md"}
          {...form.getInputProps("isSpare")}
          checked={form.getInputProps("isSpare").value || false}
        />
        {!form.getInputProps("isSpare").value && (
          <TextInput
            my={"sm"}
            label="IP Address"
            description="Input IP Address to monitor device"
            {...form.getInputProps("ipAddress")}
          />
        )}
        <Divider variant="dotted" my={"md"} />
        <Group position="apart">
          <Button
            color={"red"}
            leftIcon={<X />}
            radius="md"
            onClick={() => {
              navigate("/device");
            }}
          >
            Cancel
          </Button>
          <Button type="submit" radius={"md"} rightIcon={<DeviceFloppy />}>
            Save
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
