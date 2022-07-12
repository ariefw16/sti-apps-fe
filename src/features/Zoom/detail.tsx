import PageTitleComponent from "../../components/common/PageTitle"
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type"
import { Box, Grid, LoadingOverlay } from "@mantine/core";
import DeleteDialog from "../../components/common/DeleteDialog";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { zoomAccountDeleteState, zoomAccountDetailState, zoomListFilterState } from "./utils/store";
import { useEffect, useState } from "react";
import { deleteZoomAccount, fetchSingleZoomAccount } from "./utils/service";
import { useNavigate, useParams } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import ZoomAccountGeneralInfoDetail from "./components/detail/ZoomAccountGeneralInfoDetail";
import ZoomAccountInfoDetail from "./components/detail/ZoomAccountInfoDetail";

export default function DetailZoomAccount() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: 'Home',
      to: '/'
    },
    {
      label: 'Zoom Account Management',
      to: '/zoom-account'
    }, {
      label: 'Detail Account'
    }
  ]
  const deletion = useRecoilValue(zoomAccountDeleteState)
  const resetDeletion = useResetRecoilState(zoomAccountDeleteState)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const setAccount = useSetRecoilState(zoomAccountDetailState)
  const [deletionLoading, setDeletionLoading] = useState(false)
  const navigate = useNavigate()
  const setFilter = useSetRecoilState(zoomListFilterState)

  useEffect(() => {
    setLoading(true)
    fetchSingleZoomAccount(+id!)
      .then((res) => {
        setAccount(res)
      })
      .catch(e => {
        showNotification({ title: 'Fetch Zoom Account', message: `Error! ${e.message}`, color: 'red' })
      })
      .finally(() => { setLoading(false) })
  }, [])

  const deleteHandler = () => {
    setDeletionLoading(true)
    deleteZoomAccount(deletion.data.id)
      .then(() => {
        showNotification({ title: 'Zoom Account Deletion', message: `Zoom Account Deletion Success!`, color: 'green' })
        resetDeletion()
        navigate('/zoom-account')
        setFilter(x => ({ ...x, refreshToggle: !x.refreshToggle }))
      })
      .catch(e => {
        showNotification({ title: 'Zoom Account Deletion', message: `Error! ${e.message}`, color: 'red' })
      })
      .finally(() => {
        setDeletionLoading(false)
      })
  }

  return <>
    <PageTitleComponent breadcrumbs={breadcrumbs} title="Zoom Account Detail" />
    <Box style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />
      <Grid mt={50}>
        <Grid.Col md={5} sm={12}>
          <ZoomAccountInfoDetail />
        </Grid.Col>
        <Grid.Col md={7} sm={12}>
          <ZoomAccountGeneralInfoDetail />
        </Grid.Col>
      </Grid>
    </Box>
    <DeleteDialog
      data={deletion.data}
      onClose={resetDeletion}
      open={deletion.showModal}
      onSubmit={deleteHandler}
      loading={deletionLoading}
    />
  </>
}
