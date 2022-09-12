import { Divider, Loader, Paper, Table, TextInput, Title } from "@mantine/core";
import { Device } from "../../../Devices/utils/type";

export default function DeviceInfo(props: {
  device?: Device;
  loading: boolean;
}) {
  const { device, loading } = props;
  return (
    <>
      <Paper radius={"lg"} p={20}>
        <TextInput
          rightSection={loading && <Loader size={"sm"} />}
          readOnly
          mb="md"
          variant="filled"
          label="Device Type"
          value={device?.deviceType?.name}
          description="Device Type of this device (router, access point, etc)"
        />
        <TextInput
          rightSection={loading && <Loader size={"sm"} />}
          readOnly
          mb="md"
          variant="filled"
          label="IP Address"
          description="IP Address of this device if manageable"
          value={device?.ipAddress}
        />
        <TextInput
          rightSection={loading && <Loader size={"sm"} />}
          readOnly
          mb="md"
          variant="filled"
          label="Unit"
          description="Location where this device located"
          value={device?.unit?.name}
        />
        <TextInput
          rightSection={loading && <Loader size={"sm"} />}
          readOnly
          mb="md"
          variant="filled"
          label="Device Name"
          description="SN or Specific name of device"
          value={device?.name}
        />
      </Paper>
      <Paper radius={"lg"} p={20} mt={20}>
        <Title order={5}>List PIC Unit</Title>
        <Divider my={"md"} />
        <Table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>NIK</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {device?.unit?.user?.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}.</td>
                <td>{u.name}</td>
                <td>{u.nik}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </>
  );
}
