import { Paper, Title, Divider, TextInput, Select } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { deviceDetailState } from "../../utils/store";

export default function DeviceSpecsCardDetail() {
  const device = useRecoilValue(deviceDetailState);

  return (
    <>
      <Paper p={20} radius="lg">
        <Title order={5}>Device Type</Title>
        <Divider variant="dotted" my={"md"} />
        <TextInput
          label="Device Type"
          description="Device Type to specify specs"
          defaultValue={device.deviceType?.name}
          disabled
        />
      </Paper>
      <Paper p={20} radius="lg" mt={15}>
        <Title order={5}>Specifications</Title>
        <Divider variant="dotted" my={"md"} />
        {device.DeviceSpecs &&
          device.DeviceSpecs.map((sp) => (
            <TextInput
              label={sp.name}
              key={sp.deviceTypeSpec?.id}
              my={"md"}
              defaultValue={sp.value}
              disabled
            />
          ))}
      </Paper>
    </>
  );
}
