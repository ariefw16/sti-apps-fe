import { Box, LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import DeleteDialog from "../../components/common/DeleteDialog";
import PageTitleComponent from "../../components/common/PageTitle";
import { DataToDelete } from "../../types/common";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import ZoomAccountListCard from "./components/list/ZoomAccountListCard";
import { deleteZoomAccount, fetchZoomAccount } from "./utils/service";
import { zoomAccountDeleteState, zoomListCountState, zoomListFilterState, zoomListState } from "./utils/store";

export default function ZoomAccountPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: 'Home',
      to: '/'
    },
    {
      label: 'Zoom Account Management'
    }
  ]
  const [loading, setLoading] = useState(false)
  const setAccount = useSetRecoilState(zoomListState)
  const setRowCount = useSetRecoilState(zoomListCountState)
  const [filter, setFilter] = useRecoilState(zoomListFilterState)
  const [q] = useDebouncedValue(filter.q, 300)
  const deletion = useRecoilValue(zoomAccountDeleteState)
  const resetDeletion = useResetRecoilState(zoomAccountDeleteState)

  useEffect(() => {
    setLoading(true)
    fetchZoomAccount(filter).then(res => {
      setAccount(res.data)
      setRowCount(res.rowCount)
    }).catch(e => {
      showNotification({ title: 'Fetch Zoom Account', message: `Error! ${e.message}`, color: 'red' })
    }).finally(() => {
      setLoading(false)
    })
  }, [q, filter.page, filter.limit, filter.refreshToggle])

  const deleteHandler = () => {
    setLoading(true)
    deleteZoomAccount(deletion.data.id).then(() => {
      showNotification({ title: 'Zoom Account Deletion', message: 'Deletion Success!', color: 'green' })
      resetDeletion()
    }).catch(e => {
      showNotification({ title: 'Zoom Account Deletion', message: `Error! ${e.message}`, color: 'red' })
    }).finally(() => {
      setLoading(false)
    })
  }

  return <>
    <PageTitleComponent title="Zoom Account Management" breadcrumbs={breadcrumbs} />
    <Box style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />
      <ZoomAccountListCard />
    </Box>
    <DeleteDialog data={deletion.data} onClose={resetDeletion} open={deletion.showModal} onSubmit={deleteHandler} />
  </>
} 
