import { Box, Button, Divider, Group, Select } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SelectOptions } from "../../../types/common";
import { fetchDeviceType } from "../../DeviceType/utils/service";
import { fetchUnit } from "../../Unit/utils/service";
import { deviceListFilterState } from "../utils/store";

export default function DeviceListFilter() {
  const [filter, setFilter] = useRecoilState(deviceListFilterState);
  const [unitSelection, setUnitSelection] = useState<SelectOptions[]>([]);
  const [typeSelection, setTypeSelection] = useState<SelectOptions[]>([]);

  useEffect(() => {
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
    fetchDeviceType({})
      .then((res) => {
        setTypeSelection(
          res.data.map((d) => ({ value: d.id!.toString(), label: d.name! }))
        );
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Device Type",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  }, []);

  const unitSelectHandler = (vals: string) => {
    setFilter((f) => ({ ...f, unitId: vals }));
  };
  const deviceTypeSelectHandler = (vals: string) => {
    setFilter((f) => ({ ...f, deviceTypeId: vals }));
  };
  const isSpareSelectHandler = (vals: string) => {
    setFilter((f) => ({ ...f, isSpare: vals }));
  };
  const applyToggleRefresh = () => {
    setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
  };
  const resetForm = () => {
    setFilter((f) => ({
      ...f,
      unitId: null,
      deviceTypeId: null,
      isSpare: undefined,
    }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Select
        data={unitSelection || []}
        placeholder="Select Options"
        label="Unit :"
        sx={{ width: 300 }}
        radius="md"
        variant="filled"
        onChange={unitSelectHandler}
        value={filter.unitId || null}
      />
      <Select
        data={typeSelection || []}
        placeholder="Select Options"
        label="Device Type :"
        sx={{ width: 300 }}
        radius="md"
        variant="filled"
        onChange={deviceTypeSelectHandler}
        value={filter.deviceTypeId || null}
      />
      <Select
        data={[
          { label: "Yes, find Spare", value: "1" },
          { label: "No.", value: "0" },
        ]}
        placeholder="Select Options"
        label="Device Is Spare? :"
        sx={{ width: 300 }}
        radius="md"
        variant="filled"
        onChange={isSpareSelectHandler}
        value={filter.isSpare || null}
      />
      <Divider mt={10} />
      <Group position="apart" sx={{ marginTop: 10 }}>
        <Button
          variant="subtle"
          color="orange"
          sx={(theme) => ({ fontFamily: theme.fontFamily })}
          onClick={resetForm}
        >
          Reset
        </Button>
        <Button
          sx={(theme) => ({ fontFamily: theme.fontFamily })}
          onClick={applyToggleRefresh}
        >
          Apply
        </Button>
      </Group>
    </Box>
  );
}
