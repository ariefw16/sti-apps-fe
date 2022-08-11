import { Modal, Select, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { SelectOptions } from "../../../../types/common";
import { Device } from "../../../Devices/utils/type";
import { fetchUnit } from "../../../Unit/utils/service";
import { deviceTemplateQuickUpdateDeviceState } from "../../utils/store";

export default function QuickUpdateDeviceTemplate() {
  const data = useRecoilValue(deviceTemplateQuickUpdateDeviceState);
  const resetModal = useResetRecoilState(deviceTemplateQuickUpdateDeviceState);
  const [unitSelection, setUnitSelection] = useState<SelectOptions[]>([]);
  const [sn, setSn] = useState("");
  const [unitId, setUnitId] = useState<string | null>(null);
  const [spare, setSpare] = useState<string | null>(null);

  useEffect(() => {
    console.log(data.data);
    setSn(data.data.serialNumber || "");
    setUnitId(data.data.unitId?.toString() || null);
    setSpare(isSpare);
    fetchUnit({ parentId: null })
      .then((res) => {
        setUnitSelection(
          res.data.map((d) => ({ value: d.id!.toString(), label: d.name! }))
        );
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Unit",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  }, [data.data.id]);

  const isSpareSelectHandler = (vals: string) => {};
  const isSpare = () => (data.data.isSpare ? "1" : "0");
  const unitSelectHandler = (vals: string) => {};

  return (
    <Modal
      opened={data.showModal}
      onClose={resetModal}
      title="Quick Update Device"
      radius={"lg"}
      size="lg"
    >
      <TextInput
        label="Serial Number"
        description="Serial Number of this Device"
        my="md"
        value={sn}
        onChange={(vals) => {
          setSn(vals.target.value);
        }}
      />
      <Select
        data={[
          { label: "Yes, this device is Spare", value: "1" },
          { label: "No.", value: "0" },
        ]}
        placeholder="Select Options"
        label="Device Is Spare? :"
        sx={{ width: 300 }}
        radius="md"
        variant="filled"
        onChange={isSpareSelectHandler}
        value={spare}
      />
      <Select
        data={unitSelection || []}
        placeholder="Select Options"
        label="Unit :"
        sx={{ width: 300 }}
        radius="md"
        variant="filled"
        onChange={unitSelectHandler}
        value={unitId}
      />
    </Modal>
  );
}
