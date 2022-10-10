import {
  Button,
  Divider,
  Group,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { DeviceFloppy, X } from "tabler-icons-react";
import { SelectOptions } from "../../../../types/common";

export default function DevsAddModal(props: {
  unitOptions: SelectOptions[];
  saveHandler: any;
  defaultValues?: {
    sn: string;
    isSpare: string | null;
    unitId: string | null;
    year: string;
  };
  opened: boolean;
  onClose: any;
}) {
  const { unitOptions, saveHandler, defaultValues, opened, onClose } = props;
  const [sn, setSn] = useState("");
  const [isSpare, setIsSpare] = useState<string | null>("1");
  const [unitId, setUnitId] = useState<string | null>("");
  const [year, setYear] = useState<string>();

  useEffect(() => {
    if (defaultValues) {
      setSn(defaultValues.sn);
      setIsSpare(defaultValues.isSpare);
      setUnitId(defaultValues.unitId);
      setYear(defaultValues.year);
    }
  }, [opened]);

  const resetForm = () => {
    setSn("");
    setIsSpare("1");
    setUnitId("");
    onClose();
  };
  const saveButtonHandler = () => {
    saveHandler({ sn, unitId, isSpare, year });
    resetForm();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      radius={"lg"}
      title="Add Devices to Device Template"
    >
      <TextInput
        label="Serial Number"
        description="Input device serial number to identify with other device"
        my="md"
        value={sn || ""}
        onChange={(e) => {
          setSn(e.target.value);
        }}
      />
      <TextInput
        label="Year"
        description="Input when device is purchased (year)"
        my="md"
        value={year || ""}
        onChange={(e) => {
          setYear(e.target.value);
        }}
      />
      <Select
        data={[
          { label: "Yes, this device is a Spare", value: "1" },
          { label: "No.", value: "0" },
        ]}
        placeholder="Select Options"
        label="Device Is Spare? :"
        sx={{ width: 300 }}
        radius="md"
        my="md"
        value={isSpare}
        onChange={(v) => {
          setIsSpare(v);
        }}
      />
      <Select
        data={unitOptions}
        placeholder="Select Options"
        label="Unit"
        sx={{ width: 300 }}
        radius="md"
        my="md"
        value={unitId}
        onChange={(v) => {
          setUnitId(v);
        }}
      />
      <Divider variant="dotted" my="md" />
      <Group position="apart">
        <Button
          radius={"md"}
          variant="subtle"
          color={"orange"}
          leftIcon={<X />}
          onClick={onClose}
        >
          Discard
        </Button>
        <Button
          radius={"md"}
          rightIcon={<DeviceFloppy />}
          type="submit"
          onClick={saveButtonHandler}
        >
          Save
        </Button>
      </Group>
    </Modal>
  );
}
