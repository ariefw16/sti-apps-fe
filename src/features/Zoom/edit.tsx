import PageTitleComponent from "../../components/common/PageTitle";
import { LoadingOverlay, Grid, Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import { fetchSingleZoomAccount } from "./utils/service";
import { zoomAccountDetailState } from "./utils/store";

export default function EditZoomAccountPage() {
  const { id } = useParams();
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Zoom Account Management",
      to: "/zoom-account",
    },
    {
      label: "Update",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useRecoilState(zoomAccountDetailState)

  useEffect(() => {
    if (account.id !== +id!) {
      setLoading(true)
      fetchSingleZoomAccount(+id!)
        .then(res => {
          setAccount(res)
        })
        .catch(e => {
          showNotification({
            title: "Fetch Zoom Account",
            message: `Error! ${e.message}`,
            color: "red",
          });
        })
        .finally(() => { setLoading(false) })
    }
  }, [id])

  return <>
    <PageTitleComponent
      title="Update Data Zoom Account"
      breadcrumbs={breadcrumbs}
    />
    <Box style={{ position: "relative" }}>
      <LoadingOverlay visible={loading} />
      <Grid mt={50}>
        <Grid.Col span={4}>
        </Grid.Col>
        <Grid.Col span={8}>
        </Grid.Col>
      </Grid>
    </Box>
  </>
} 
