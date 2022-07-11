import { Select, Checkbox, Divider, Paper, TextInput, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { ZoomAccountCreate } from "../../utils/type";
import { useState, useEffect } from 'react'
import { SelectOptions } from "../../../../types/common";
import { fetchUnit } from "../../../Unit/utils/service";

export default function ZoomAccountGeneralInfoCard(props: { form: UseFormReturnType<ZoomAccountCreate> }) {
  const { form } = props
  const [unitOptions, setUnitOptions] = useState<SelectOptions[]>([]);

  useEffect(() => {
    fetchUnit({ parentId: null }).then((res) => {
      setUnitOptions(
        res.data.map((u) => ({ label: u.name!, value: u.id!.toString() }))
      );
    });
  }, []);

  return <Paper p={20} radius="lg">
    <Title order={5}>General Information</Title>
    <Divider my="md" variant="dotted" />
    <TextInput my="sm" label="Zoom Account Name" description="Zoom Account Title / Description" placeholder="Zoom Account"
      {...form.getInputProps('name')}
    />
    <Select
      my={"sm"}
      label="Unit"
      description="Select unit where this device is located"
      data={unitOptions}
      required
      {...form.getInputProps("unitId")}
    />
    <Checkbox label="Account Zoom is Active ? " my={"md"} {...form.getInputProps('active')} />
  </Paper>
}
