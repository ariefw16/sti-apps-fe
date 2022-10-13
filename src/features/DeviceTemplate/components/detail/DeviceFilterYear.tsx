import { Checkbox, Divider, Paper, Title } from "@mantine/core";
import { useRecoilState } from "recoil";
import { deviceTemplateYearSelectionState } from "../../utils/store";

export default function DeviceTemplateFilterYearDevice() {
  const [yearParam, setYearParam] = useRecoilState(
    deviceTemplateYearSelectionState
  );

  const onChangeYearCheckbox = (year: string) => {
    const newArr: any[] = JSON.parse(JSON.stringify(yearParam));
    const idx = newArr.findIndex((a) => a.year === year);
    newArr[idx].selected = !newArr[idx].selected;
    setYearParam(newArr);
  };
  return (
    <Paper mt={20} p={20} radius="lg">
      <Title order={5}>Filter Year</Title>
      <Divider my={"md"} variant="dotted" />
      {yearParam.map((y) => (
        <Checkbox
          label={"Tahun " + y.year + ` (${y.count})`}
          my={"sm"}
          checked={y.selected}
          onChange={() => {
            onChangeYearCheckbox(y.year);
          }}
          key={y.year}
        />
      ))}
    </Paper>
  );
}
