import { Box, Button, Divider, Group, Select } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelectOptions } from "../../../../types/common";
import { fetchDeviceType } from "../../../DeviceType/utils/service";
import { fetchUnit } from "../../../Unit/utils/service";
import { incidentListFilterState } from "../../utils/store";

export default function IncidentListFilter() {
  const [unitSelection, setUnitSelection] = useState<SelectOptions[]>([]);
  const [typeSelection, setTypeSelection] = useState<SelectOptions[]>([]);
  const [filter, setFilter] = useRecoilState(incidentListFilterState);

  useEffect(() => {
    fetchUnit({ parentId: null })
      .then((res) => {
        setUnitSelection(
          res.data.map((d) => ({ label: d.name!, value: d.id!.toString() }))
        );
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Unit",
          message: `Error! ${e.message}`,
        });
      });
    fetchDeviceType({})
      .then((res) => {
        setTypeSelection(
          res.data.map((dt) => ({ label: dt.name!, value: dt.id!.toString() }))
        );
      })
      .catch((e) => {
        showNotification({
          title: "Fetch DeviceType",
          message: `Error! ${e.message}`,
        });
      });
  }, []);

  const unitSelectHandler = (unitId: string) => {
    setFilter((f) => ({ ...f, unitId }));
  };
  const typeSelectHandler = (deviceTypeId: string) => {
    setFilter((f) => ({ ...f, deviceTypeId }));
  };
  const solvedSelectHandler = (isDone: string) => {
    setFilter((f) => ({ ...f, isDone }));
  };
  const resetForm = () => {
    setFilter((f) => ({
      ...f,
      unitId: null,
      deviceTypeId: null,
      isDone: undefined,
    }));
  };
  const applyToggleRefresh = () => {
    setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
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
        onChange={typeSelectHandler}
        value={filter.deviceTypeId || null}
      />
      <Select
        data={[
          { label: "Yes, find Solved Incident", value: "1" },
          { label: "No.", value: "0" },
        ]}
        placeholder="Select Options"
        label="Solved Incident ?"
        sx={{ width: 300 }}
        radius="md"
        variant="filled"
        onChange={solvedSelectHandler}
        value={filter.isDone || null}
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
