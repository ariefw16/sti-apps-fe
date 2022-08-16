import {
  Badge,
  Button,
  Divider,
  Group,
  Menu,
  Paper,
  Table,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ChevronDown, Pencil, Plus, Trash } from "tabler-icons-react";
import { SelectOptions } from "../../../../types/common";
import { fetchUnit } from "../../../Unit/utils/service";
import {
  deviceTemplateDevsCreateModalState,
  deviceTemplateDevsCreateState,
  deviceTemplateLoadingCreateState,
} from "../../utils/store";
import DevsAddModal from "./DevsAddModal";

export default function DeviceTemplateDevsCreate() {
  const [data, setData] = useRecoilState(deviceTemplateDevsCreateState);
  const setCreateModal = useSetRecoilState(deviceTemplateDevsCreateModalState);
  const [unitOptions, setUnitOptions] = useState<SelectOptions[]>([]);
  const loading = useRecoilValue(deviceTemplateLoadingCreateState);

  useEffect(() => {
    fetchUnit({ parentId: null }).then((res) => {
      setUnitOptions(
        res.data.map((d) => ({ value: d.id!.toString(), label: d.name! }))
      );
    });
  }, []);

  const saveButtonHandler = (props: {
    sn: string;
    unitId: string | null;
    isSpare: string | null;
  }) => {
    setData((d) => [
      ...d,
      {
        serialNumber: props.sn,
        unitId: props.unitId,
        isSpare: props.isSpare === "1",
        unitName: unitOptions.find((f) => f.value === props.unitId)?.label,
      },
    ]);
  };

  return (
    <>
      <Paper p={20} radius="lg">
        <Group position="apart">
          <Title order={5}>Devices</Title>
          <Button
            leftIcon={<Plus />}
            radius="lg"
            variant="light"
            color={"cyan"}
            onClick={() => {
              setCreateModal(true);
            }}
            loading={loading}
          >
            Add Device
          </Button>
        </Group>
        <Divider my={"md"} variant="dotted" />
        <Table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Is Spare</th>
              <th>Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, idx) => (
              <tr key={idx}>
                <td>{d.serialNumber}</td>
                <td>
                  {d.isSpare ? (
                    <Badge color={"indigo"}>Yes</Badge>
                  ) : (
                    <Badge color={"orange"}>No</Badge>
                  )}
                </td>
                <td>{d.unitName}</td>
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
                      icon={<Pencil size={14} />}
                      onClick={() => {}}
                      disabled={loading}
                    >
                      Update
                    </Menu.Item>
                    <Menu.Item
                      icon={<Trash size={14} />}
                      color="red"
                      onClick={() => {}}
                      disabled={loading}
                    >
                      Delete
                    </Menu.Item>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
      <DevsAddModal unitOptions={unitOptions} saveHandler={saveButtonHandler} />
    </>
  );
}
