import { Paper } from "@mantine/core";
import RefreshButton from "../../../../components/common/RefreshButton";
import ListHeaderCard from "../../../../components/common/ListHeaderCard";
import { useRecoilState } from "recoil";
import { groupListFilterState } from "../../utils/store";

export default function GroupListCard() {
  const [filter, setFilter] = useRecoilState(groupListFilterState);

  const applyToggleRefresh = () => {
    setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
  };
  const setSearch = (vals: string) => {
    setFilter((f) => ({ ...f, q: vals }));
  };

  return (
    <>
      <Paper radius={"lg"} p="lg" sx={{ marginTop: 50 }}>
        <ListHeaderCard
          refreshButton={<RefreshButton onClick={applyToggleRefresh} />}
          setSearch={setSearch}
          search={filter.q}
        />
      </Paper>
    </>
  );
}
