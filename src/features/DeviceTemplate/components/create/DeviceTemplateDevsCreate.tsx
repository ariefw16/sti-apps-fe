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
import { useRecoilState, useRecoilValue } from "recoil";
import { ChevronDown, Pencil, Plus, Trash } from "tabler-icons-react";
import { SelectOptions } from "../../../../types/common";
import { fetchUnit } from "../../../Unit/utils/service";
import {
  deviceTemplateDevsCreateState,
  deviceTemplateLoadingCreateState,
} from "../../utils/store";
import DevsAddModal from "./DevsAddModal";

export default function DeviceTemplateDevsCreate() {
  const [data, setData] = useRecoilState(deviceTemplateDevsCreateState);
  const [unitOptions, setUnitOptions] = useState<SelectOptions[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [idxUpdate, setIdxUpdate] = useState<number>(-1);
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
    year: string;
  }) => {
    setData((d) => [
      ...d,
      {
        serialNumber: props.sn,
        unitId: props.unitId,
        isSpare: props.isSpare === "1",
        unitName: unitOptions.find((f) => f.value === props.unitId)?.label,
        year: props.year,
      },
    ]);
  };
  const removeDevice = (idx: number) => {
    setData((d) => d.filter((e, i) => i !== idx));
  };
  const closeAddModalHandler = () => {
    setShowCreate(false);
  };
  const updateButtonHandler = (idx: number) => {
    setIdxUpdate(idx);
    setShowUpdate(true);
  };
  const closeUpdateModalHandler = () => {
    setShowUpdate(false);
    setIdxUpdate(-1);
  };
  const saveUpdateHandler = (props: {
    sn: string;
    unitId: string | null;
    isSpare: string | null;
    year: string;
  }) => {
    const { sn, unitId, isSpare, year } = props;
    setData(
      data.map((dt, idx) => {
        if (idx === idxUpdate)
          return {
            serialNumber: sn,
            unitId,
            isSpare: isSpare === "1",
            unitName: unitOptions.find((e) => e.value === unitId)?.label,
            year,
          };
        else return dt;
      })
    );
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
              setShowCreate(true);
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
              <th>Year</th>
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
                <td>{d.year}</td>
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
                      onClick={() => {
                        updateButtonHandler(idx);
                      }}
                      disabled={loading}
                    >
                      Update
                    </Menu.Item>
                    <Menu.Item
                      icon={<Trash size={14} />}
                      color="red"
                      onClick={() => {
                        removeDevice(idx);
                      }}
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
      <DevsAddModal
        unitOptions={unitOptions}
        saveHandler={saveButtonHandler}
        opened={showCreate}
        onClose={closeAddModalHandler}
      />
      <DevsAddModal
        unitOptions={unitOptions}
        opened={showUpdate}
        onClose={closeUpdateModalHandler}
        saveHandler={saveUpdateHandler}
        defaultValues={{
          sn: data[idxUpdate]?.serialNumber || "",
          unitId: data[idxUpdate]?.unitId || null,
          isSpare: data[idxUpdate]?.isSpare ? "1" : "0",
          year: data[idxUpdate]?.year || "",
        }}
      />
    </>
  );
}
