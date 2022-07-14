import { Box, Group, Button, Select, Divider } from "@mantine/core";
import { useRecoilState } from "recoil";
import { meetingListFilterState } from "../../utils/store";

export default function MeetingFilterForm() {
  const [filter, setFilter] = useRecoilState(meetingListFilterState)

  const applyToggleRefresh = () => {
    setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
  };
  const resetForm = () => {
    setFilter((f) => ({
      ...f,
      status: undefined
    }));
  };
  const statusOnChangeHandler = (vals: string) => {
    setFilter(f => ({ ...f, status: vals }))
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
