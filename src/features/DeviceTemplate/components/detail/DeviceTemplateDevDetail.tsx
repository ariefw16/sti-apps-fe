import {
  Paper,
  Title,
  Divider,
  Table,
  Badge,
  Menu,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ChevronDown, Eye, Pencil } from "tabler-icons-react";
import { deviceTemplateDetailState } from "../../utils/store";

export default function DeviceTemplateDevicesDetail() {
  const template = useRecoilValue(deviceTemplateDetailState);
  const navigate = useNavigate();

  return (
    <Paper mt={20} p={20} radius="lg">
      <Title order={5}>Device List</Title>
      <Divider my={"md"} variant="dotted" />
      <Table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>is Spare</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {template.devices &&
            template.devices.map((d) => (
              <tr>
                <td>{d.serialNumber}</td>
                <td>
                  {d.isSpare ? (
                    <Badge color={"orange"}>Spare</Badge>
                  ) : (
                    <Badge color={"green"}>Used</Badge>
                  )}
                </td>
                <td>{d.unit?.name || "-"}</td>
                <td>
                  <Menu
                    control={
                      <Button
                        size="xs"
                        variant="light"
                        rightIcon={<ChevronDown size={14} />}
                      >
                        Actions
                      </Button>
                    }
                  >
                    <Menu.Item
                      icon={<Eye size={14} />}
                      onClick={() => {
                        navigate(`/device/${d.id}`);
                      }}
                    >
                      View
                    </Menu.Item>
                    <Menu.Item icon={<Pencil size={14} />} onClick={() => {}}>
                      Update
                    </Menu.Item>
                  </Menu>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Paper>
  );
}
