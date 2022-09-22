import { Divider, Paper } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import AddButton from "../../../../components/common/AddButton";
import ListFooterCard from "../../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../../components/common/ListHeaderCard";
import RefreshButton from "../../../../components/common/RefreshButton";
import {
  inspectionTemplateListCountState,
  inspectionTemplateListFilterState,
} from "../../utils/store";
import InspectionTemplateTable from "./TemplateTable";

export default function InspectionTemplateCard() {
  const [filter, setFilter] = useRecoilState(inspectionTemplateListFilterState);
  const rowCount = useRecoilValue(inspectionTemplateListCountState);
  const navigate = useNavigate();

  const setSearch = (txt: string) => {
    setFilter((x) => ({ ...x, q: txt }));
  };
  const applyToggleRefresh = () => {
    setFilter((x) => ({ ...x, refreshToggle: !x.refreshToggle }));
  };
  const rowsChangeHandler = (value: string) => {
    setFilter((x) => ({ ...x, page: 1, limit: +value }));
  };
  const pageChangeHandler = (value: number) => {
    setFilter((x) => ({ ...x, page: value }));
  };

  return (
    <Paper p="lg" mt={50} radius="lg">
      <ListHeaderCard
        addButton={
          <AddButton
            onClick={() => {
              navigate("/inspection-template/create");
            }}
          />
        }
        search={filter.q}
        setSearch={setSearch}
        refreshButton={<RefreshButton onClick={applyToggleRefresh} />}
      />
      <Divider my="sm" variant="dotted" />
      <InspectionTemplateTable />
      <ListFooterCard
        onPageChange={pageChangeHandler}
        onRowPerPageChange={rowsChangeHandler}
        rows={rowCount}
        page={filter.page}
        rowsPerPage={filter.limit?.toString()}
      />
    </Paper>
  );
}
