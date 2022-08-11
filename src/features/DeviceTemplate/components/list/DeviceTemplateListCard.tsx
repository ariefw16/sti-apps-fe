import { Divider, Paper } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import AddButton from "../../../../components/common/AddButton";
import DeleteDialog from "../../../../components/common/DeleteDialog";
import ListFooterCard from "../../../../components/common/ListFooterCard";
import ListHeaderCard from "../../../../components/common/ListHeaderCard";
import RefreshButton from "../../../../components/common/RefreshButton";
import { deviceTypeListCountState } from "../../../DeviceType/utils/store";
import { deleteDeviceTemplate, fetchDeviceTemplate } from "../../utils/service";
import {
  deviceTemplateDeletionState,
  deviceTemplateListFilterState,
  deviceTemplateListState,
} from "../../utils/store";
import DeviceTemplateTable from "./DeviceTemplateTable";

export default function DeviceTemplateListCard() {
  const [filter, setFilter] = useRecoilState(deviceTemplateListFilterState);
  const [rowCount, setRowCount] = useRecoilState(deviceTypeListCountState);
  const setData = useSetRecoilState(deviceTemplateListState);
  const [q] = useDebouncedValue(filter.q, 300);
  const deletion = useRecoilValue(deviceTemplateDeletionState);
  const resetDeletion = useResetRecoilState(deviceTemplateDeletionState);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeviceTemplate(filter)
      .then((res) => {
        setData(res.data);
        setRowCount(res.rowCount);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Device Template",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  }, [q, filter.page, filter.limit, filter.refreshToggle]);

  const setSearch = (vals: string) => {
    setFilter((f) => ({ ...f, q: vals }));
  };
  const applyToggleRefresh = () => {
    setFilter((f) => ({ ...f, refreshToggle: !f.refreshToggle }));
  };
  const rowsChangeHandler = (value: string) => {
    setFilter((x) => ({ ...x, page: 1, limit: +value }));
  };
  const pageChangeHandler = (value: number) => {
    setFilter((x) => ({ ...x, page: value }));
  };
  const deleteHandler = () => {
    setDeletionLoading(true);
    deleteDeviceTemplate(deletion.data.id)
      .then(() => {
        resetDeletion();
        showNotification({
          title: "Device Template Deletion",
          message: "Device Template Deletion Success!",
          color: "green",
        });
        applyToggleRefresh();
      })
      .catch((e) => {
        showNotification({
          title: "Device Template Deletion",
          message: `Error! ${e.message}`,
          color: "green",
        });
      })
      .finally(() => {
        setDeletionLoading(false);
      });
  };

  return (
    <>
      <Paper radius={"lg"} p="lg" sx={{ marginTop: 20 }}>
        <ListHeaderCard
          refreshButton={<RefreshButton onClick={applyToggleRefresh} />}
          setSearch={setSearch}
          search={filter.q}
          addButton={
            <AddButton
              onClick={() => {
                navigate("/device-template/create");
              }}
            />
          }
        />
        <Divider my="sm" variant="dotted" />
        <DeviceTemplateTable />
        <ListFooterCard
          onPageChange={pageChangeHandler}
          onRowPerPageChange={rowsChangeHandler}
          rows={rowCount}
          page={filter.page}
          rowsPerPage={filter.limit?.toString()}
        />
      </Paper>
      <DeleteDialog
        open={deletion.showModal}
        onClose={resetDeletion}
        data={deletion.data}
        onSubmit={deleteHandler}
        loading={deletionLoading}
      />
    </>
  );
}
