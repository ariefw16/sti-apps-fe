import { Select, Checkbox, Divider, Paper, TextInput, Title, Group, Button } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { ZoomAccountCreate } from "../../utils/type";
import { useState, useEffect } from 'react'
import { SelectOptions } from "../../../../types/common";
import { fetchUnit } from "../../../Unit/utils/service";
import { DeviceFloppy, X } from "tabler-icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { zoomAccountCreateLoadingState } from "../../utils/store";

export default function ZoomAccountGeneralInfoEdit(props: { form: UseFormReturnType<ZoomAccountCreate> }) {
  const { form } = props
  const { id } = useParams()
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

  const cancelButtonHandler = () => {
    navigate(`/zoom-account/${id}`)
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
      <Button onClick={cancelButtonHandler} loading={loading} color="orange" leftIcon={<X />} radius="md">Cancel</Button>
      <Button rightIcon={<DeviceFloppy />} type="submit" loading={loading} radius={"md"}>Save</Button>
    </Group>
  </Paper>
}
