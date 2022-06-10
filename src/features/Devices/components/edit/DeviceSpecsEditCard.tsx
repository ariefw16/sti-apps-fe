import { Paper, Title, Divider, TextInput } from "@mantine/core";
import { useRecoilState } from "recoil";
import { deviceDetailState } from "../../utils/store";

export default function DeviceSpecsEditCard() {
  const [device, setDevice] = useRecoilState(deviceDetailState);

  const specsChangeHandler = (vals: string, id: number) => {
    setDevice((d) => {
      const idx = d.DeviceSpecs?.findIndex((x) => x.id === id);
      const data = JSON.parse(JSON.stringify(d)); // create copy / duplicate from readonly state
      data.DeviceSpecs![idx!].value = vals;
      return data;
    });
  };
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
              value={sp.value || ""}
              onChange={(vals) => {
                specsChangeHandler(vals.target.value, sp.id!);
              }}
              required={sp.deviceTypeSpec?.isMandatory}
            />
          ))}
      </Paper>
    </>
  );
}
