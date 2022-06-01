import { Box, Button, Divider, Group, Paper, Select } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import AddButton from "../../../components/common/AddButton";
import DeleteDialog from "../../../components/common/DeleteDialog";
import ListFooterCard from "../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../components/common/ListHeaderCard";
import RefreshButton from "../../../components/common/RefreshButton";
import { deleteUnit, fetchParentUnit } from "../../../services/unit.service";
import {
  unitDeleteModalState,
  unitFilterState,
  unitListCountState,
  unitListState,
  unitPagingFilterState,
} from "../../../stores/unit.store";
import { UnitParent } from "../../../types/unit.type";
import UnitCreateModal from "./UnitCreateModal";
import UnitEditModal from "./UnitEditModal";
import { UnitTable } from "./UnitTable";

export default function UnitListCard() {
  const rowCount = useRecoilValue(unitListCountState);
  const [pagingFilter, setPagingFilter] = useRecoilState(unitPagingFilterState);
  const [filter, setFilter] = useRecoilState(unitFilterState);
  const [parents, setParents] = useState<UnitParent[]>();
  const [create, setCreate] = useState(false);
  const [deletion, setDeletion] = useRecoilState(unitDeleteModalState);
  const setUnitList = useSetRecoilState(unitListState);
  const setUnitCount = useSetRecoilState(unitListCountState);

  useEffect(() => {
    fetchParentUnit({}).then((res) => {
      setParents(res);
    });
  }, []);

  const rowsChangeHandler = (value: string) => {
    setPagingFilter((x) => ({ page: 1, limit: +value }));
  };
  const pageChangeHandler = (value: number) => {
    setPagingFilter((x) => ({ ...x, page: value }));
  };
  const searchChangeHandler = (value: string) => {
    setFilter((x) => ({ ...x, search: value }));
  };
  const parentSelectHandler = (vals: string) => {
    setFilter((x) => ({ ...x, parentId: vals }));
  };
  const applyToggleRefresh = () => {
    setFilter((x) => ({ ...x, toggleRefresh: !x.toggleRefresh }));
  };
  const toggleCreateHandler = () => {
    setCreate((x) => !x);
  };
  const deleteDataHandler = () => {
    deleteUnit(deletion.data!)
      .then((x) => {
        setUnitList((un) => un.filter((dt) => dt.id !== x.id));
        setUnitCount((x) => x - 1);
        showNotification({
          message: "Unit Deletion Success!",
          title: "Unit Deletion",
          color: "green",
        });
        setDeletion((x) => ({ ...x, showModal: false }));
      })
      .catch((e) => {
        showNotification({
          message: `Unit Deletion Failed! ${e.message}`,
          title: "Unit Deletion",
          color: "red",
        });
      });
  };

  const filterForm = (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Select
        data={parents?.map((x) => ({ value: x.id!, label: x.name! })) || []}
        placeholder="Select Options"
        label="Parent Unit :"
        sx={{ width: 300 }}
        radius="md"
        variant="filled"
        onChange={parentSelectHandler}
        value={filter.parentId}
      />
      <Divider mt={10} />
      <Group position="apart" sx={{ marginTop: 10 }}>
        <Button
          variant="subtle"
          color="orange"
          sx={(theme) => ({ fontFamily: theme.fontFamily })}
          onClick={() => {
            parentSelectHandler("");
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
    <>
      <Paper radius={"lg"} p="lg" sx={{ marginTop: 50 }}>
        <ListHeaderCard
          search={filter.search}
          setSearch={searchChangeHandler}
          filterForm={filterForm}
          addButton={<AddButton onClick={toggleCreateHandler} />}
          refreshButton={<RefreshButton onClick={applyToggleRefresh} />}
        />
        <UnitTable />
        <Divider my="sm" variant="dotted" />
        <ListFooterCard
          onPageChange={pageChangeHandler}
          onRowPerPageChange={rowsChangeHandler}
          rows={rowCount}
          rowsPerPage={pagingFilter.limit?.toString()}
          page={pagingFilter.page}
        />
      </Paper>
      <UnitCreateModal open={create} onClose={toggleCreateHandler} />
      <DeleteDialog
        open={deletion.showModal}
        onClose={() => {
          setDeletion((x) => ({ ...x, showModal: false }));
        }}
        data={deletion.data!}
        onSubmit={deleteDataHandler}
      />
      <UnitEditModal />
    </>
  );
}
