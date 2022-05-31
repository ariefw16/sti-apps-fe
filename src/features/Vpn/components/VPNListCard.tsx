import { Paper, Divider, Box, Button, Group, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Plus, Refresh } from "tabler-icons-react";
import ListFooterCard from "../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../components/common/ListHeaderCard";
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

  const addButton = (
    <Button
      leftIcon={<Plus />}
      size="md"
      style={{ paddingLeft: 10, paddingRight: 15 }}
      radius="md"
      sx={(theme) => ({ fontFamily: theme.fontFamily })}
      onClick={() => {
        setCreate((x) => ({ ...x, showModal: true }));
      }}
    >
      Add
    </Button>
  );
  const refreshButton = (
    <Button
      size="md"
      radius={"md"}
      sx={{ paddingRight: 5, paddingLeft: 5 }}
      variant="light"
      color={"green"}
      onClick={applyToggleRefresh}
    >
      <Refresh />
    </Button>
  );
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
        addButton={addButton}
        setSearch={setSearch}
        search={filter.q}
        refreshButton={refreshButton}
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
