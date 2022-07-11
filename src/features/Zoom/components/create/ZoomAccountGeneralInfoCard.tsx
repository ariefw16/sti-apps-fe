import { Select, Checkbox, Divider, Paper, TextInput, Title, Group, Button } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { ZoomAccountCreate } from "../../utils/type";
import { useState, useEffect } from 'react'
import { SelectOptions } from "../../../../types/common";
import { fetchUnit } from "../../../Unit/utils/service";
import { ArrowLeft, DeviceFloppy } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { zoomAccountCreateLoadingState } from "../../utils/store";

export default function ZoomAccountGeneralInfoCard(props: { form: UseFormReturnType<ZoomAccountCreate> }) {
  const { form } = props
  const [unitOptions, setUnitOptions] = useState<SelectOptions[]>([]);
  const navigate = useNavigate()
  const loading = useRecoilValue(zoomAccountCreateLoadingState)

  useEffect(() => {
    fetchUnit({ parentId: null }).then((res) => {
      setUnitOptions(
        res.data.map((u) => ({ label: u.name!, value: u.id!.toString() }))
      );
    });
  }, []);

  const backButtonHandler = () => {
    navigate(-1)
  }

  return <Paper p={20} radius="lg">
    <Title order={5}>General Information</Title>
    <Divider my="md" variant="dotted" />
    <TextInput my="sm" label="Zoom Account Name" description="Zoom Account Title / Description" placeholder="Zoom Account"
      disabled={loading}
      {...form.getInputProps('name')}
    />
    <Select
      my={"sm"}
      label="Unit"
      description="Select unit where this acount belongs To"
      data={unitOptions}
      required
      placeholder="Select Owner Unit"
      disabled={loading}
      {...form.getInputProps("unitId")}
    />
    <Checkbox disabled={loading} label="Account Zoom is Active ? " my={"md"} {...form.getInputProps('active')} />
    <Divider my="md" variant="dotted" />
    <Group position="apart">
      <Button onClick={backButtonHandler} loading={loading} color="orange" leftIcon={<ArrowLeft />} radius="md">Back</Button>
      <Button rightIcon={<DeviceFloppy />} type="submit" loading={loading} radius={"md"}>Save</Button>
    </Group>
  </Paper>
}
