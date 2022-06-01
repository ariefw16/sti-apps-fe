import { Paper, Divider, Box, Button, Group, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import AddButton from "../../../components/common/AddButton";
import ListFooterCard from "../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../components/common/ListHeaderCard";
import RefreshButton from "../../../components/common/RefreshButton";
import { fetchUnit } from "../../../services/unit.service";
import {
  vpnCreateState,
  vpnListFilterState,
  vpnListRowCountState,
} from "../../../stores/vpn.store";
import VPNTable from "./VPNTable";

export default function VPNListCard() {
  const [filter, setFilter] = useRecoilState(vpnListFilterState);
  const rowCount = useRecoilValue(vpnListRowCountState);
  const setCreate = useSetRecoilState(vpnCreateState);
  const [unitSelection, setUnitSelection] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    fetchUnit({ parentId: null }).then((res) => {
      setUnitSelection(
        res.data.map((u) => ({ label: u.name!, value: u.id!.toString() }))
      );
    });
  }, []);

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
  const unitSelectHandler = (vals: string) => {
    setFilter((x) => ({ ...x, unitId: vals }));
  };

  const filterForm = (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Select
        data={unitSelection || []}
        placeholder="Select Options"
        label="Unit :"
        sx={{ width: 300 }}
        radius="md"
        variant="filled"
        onChange={unitSelectHandler}
        value={filter.unitId}
      />
      <Divider mt={10} />
      <Group position="apart" sx={{ marginTop: 10 }}>
        <Button
          variant="subtle"
          color="orange"
          sx={(theme) => ({ fontFamily: theme.fontFamily })}
          onClick={() => {
            unitSelectHandler("");
          }}
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

  return (
    <Paper radius={"lg"} p="lg" sx={{ marginTop: 50 }}>
      <ListHeaderCard
        addButton={
          <AddButton
            onClick={() => {
              setCreate((x) => ({ ...x, showModal: true }));
            }}
          />
        }
        setSearch={setSearch}
        search={filter.q}
        refreshButton={<RefreshButton onClick={applyToggleRefresh} />}
        filterForm={filterForm}
      />
      <VPNTable />
      <Divider my="sm" variant="dotted" />
      <ListFooterCard
        onPageChange={pageChangeHandler}
        onRowPerPageChange={rowsChangeHandler}
        rows={rowCount}
        rowsPerPage={filter.limit?.toString()}
        page={filter.page}
      />
    </Paper>
  );
}
