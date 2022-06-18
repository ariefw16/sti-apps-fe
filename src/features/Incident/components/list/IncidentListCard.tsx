import { Paper, Divider } from "@mantine/core";
import { useRecoilState, useRecoilValue } from "recoil";
import ListFooterCard from "../../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../../components/common/ListHeaderCard";
import RefreshButton from "../../../../components/common/RefreshButton";
import DeviceListFilter from "../../../Devices/components/DeviceListFilter";
import {
  incidentListFilterState,
  incidentListCountState,
} from "../../utils/store";
import AddActivityModal from "../AddActivityModal";
import IncidentsTable from "./IncidentListTable";

export default function IncidentListCard() {
  const [filter, setFilter] = useRecoilState(incidentListFilterState);
  const rowCount = useRecoilValue(incidentListCountState);

  const applyToggleRefresh = () => {
    setFilter((x) => ({ ...x, refreshToggle: !x.refreshToggle }));
  };
  const setSearch = (vals: string) => {
    setFilter((f) => ({ ...f, q: vals }));
  };
  const rowsChangeHandler = (value: string) => {
    setFilter((x) => ({ ...x, page: 1, limit: +value }));
  };
  const pageChangeHandler = (value: number) => {
    setFilter((x) => ({ ...x, page: value }));
  };

  return (
    <>
      <Paper radius={"lg"} p="lg" sx={{ marginTop: 50 }}>
        <ListHeaderCard
          refreshButton={<RefreshButton onClick={applyToggleRefresh} />}
          setSearch={setSearch}
          search={filter.q}
          filterForm={<DeviceListFilter />}
        />
        <IncidentsTable />
        <Divider my="sm" variant="dotted" />
        <ListFooterCard
          onPageChange={pageChangeHandler}
          onRowPerPageChange={rowsChangeHandler}
          rows={rowCount}
          page={filter.page}
          rowsPerPage={filter.limit?.toString()}
        />
      </Paper>
      <AddActivityModal />
    </>
  );
}
