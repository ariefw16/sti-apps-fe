import { Box, LoadingOverlay } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import ZoomAccountListCard from "./components/list/ZoomAccountListCard";
import { fetchZoomAccount } from "./utils/service";
import { zoomListCountState, zoomListState } from "./utils/store";

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

  useEffect(() => {
    setLoading(true)
    fetchZoomAccount({}).then(res => {
      setAccount(res.data)
      setRowCount(res.rowCount)
    }).catch(e => {
      showNotification({ title: 'Fetch Zoom Account', message: `Error! ${e.message}`, color: 'red' })
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return <>
    <PageTitleComponent title="Zoom Account Management" breadcrumbs={breadcrumbs} />
    <Box style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />
      <ZoomAccountListCard />
    </Box>
  </>
} 
