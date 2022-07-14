import { Box, Group, Button, Select, Divider } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SelectOptions } from "../../../../types/common";
import { fetchZoomAccount } from "../../../Zoom/utils/service";
import { meetingListFilterState } from "../../utils/store";

export default function MeetingFilterForm() {
  const [filter, setFilter] = useRecoilState(meetingListFilterState)
  const [accountSelection, setAccountSelection] = useState<SelectOptions[]>([])

  useEffect(() => {
    fetchZoomAccount({})
      .then(res => {
        setAccountSelection(res.data.map(r => ({ label: r.name!, value: r.id!.toString() })))
      })
      .catch(e => {
        showNotification({ title: 'Fetch Zoom Account', message: `Error! ${e.message}`, color: 'red' })
      })
  }, [])

  const applyToggleRefresh = () => {
    setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
  };
  const resetForm = () => {
    setFilter((f) => ({
      ...f,
      zoomAccountId: undefined,
      status: undefined
    }));
  };
  const statusOnChangeHandler = (vals: string) => {
    setFilter(f => ({ ...f, status: vals }))
  }
  const accountSelectHandler = (vals: string) => {
    setFilter(f => ({ ...f, zoomAccountId: vals }))
  }

  return <Box>
    <Select
      data={[
        { label: "Approved", value: "1" },
        { label: "Waiting for Approval", value: "0" },
      ]}
      placeholder="Select Options"
      label="Approval Status"
      sx={{ width: 300 }}
      radius="md"
      variant="filled"
      onChange={statusOnChangeHandler}
      value={filter.status || null}
    />
    <Select
      data={accountSelection || []}
      placeholder="Select Options"
      label="Zoom Account"
      sx={{ width: 300 }}
      radius="md"
      variant="filled"
      onChange={accountSelectHandler}
      value={filter.zoomAccountId || null}
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
}
