import { Select, Paper, Title, Divider, TextInput } from "@mantine/core";
import { zodResolver, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { z } from "zod";
import { SelectOptions } from "../../../../types/common";
import {
  fetchDeviceType,
  fetchSingleDeviceType,
} from "../../../DeviceType/utils/service";
import { CreateDeviceTemplate } from "../../utils/type";

const schema = z.object({
  name: z.string().min(5),
  deviceTypeId: z.string().min(1),
});
export default function DeviceTemplateGeneralCreate() {
  const [typeOptions, setTypeOptions] = useState<SelectOptions[]>([]);
  const form = useForm<CreateDeviceTemplate>({
    initialValues: {
      name: "",
      deviceTypeId: "",
    },
    schema: zodResolver(schema),
  });

  useEffect(() => {
    fetchDeviceType({}).then((res) => {
      setTypeOptions(
        res.data.map((dt) => ({
          value: dt.id?.toString() || "",
          label: dt.name || "",
        }))
      );
    });
  }, []);

  const typeChangeHandler = (value: string) => {
    fetchSingleDeviceType(+value)
      .then((res) => {
        // if (res.DeviceTypeSpec)
        // setSpecs(
        //   res.DeviceTypeSpec?.map((sp) => ({
        //     value: "",
        //     specType: sp.specType,
        //     name: sp.name,
        //     deviceTypeSpec: sp,
        //     deviceTypeSpecId: sp.id,
        //   }))
        // );
        // setDeviceTypeId(+value);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Specification",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

  return (
    <Paper p={20} radius="lg">
      <Title order={5}>General Information</Title>
      <Divider my={"md"} variant="dotted" />
      <TextInput
        my={"sm"}
        label="Name"
        description="Device Template Name, applied to all device"
        placeholder="ex: Unifi HD"
        {...form.getInputProps("name")}
      />
      <Select
        data={typeOptions}
        placeholder="Select one Device Type"
        clearable
        onChange={typeChangeHandler}
      />
    </Paper>
  );
}
