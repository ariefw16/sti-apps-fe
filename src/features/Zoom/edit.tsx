import PageTitleComponent from "../../components/common/PageTitle";
import { LoadingOverlay, Grid, Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import { fetchSingleZoomAccount, updateZoomAccount } from "./utils/service";
import { zoomAccountDetailState } from "./utils/store";
import ZoomAccountGeneralInfoEdit from "./components/edit/ZoomAccountGeneralInfoEdit";
import { z } from 'zod'
import { ZoomAccountCreate } from './utils/type'
import { useForm, zodResolver } from "@mantine/form";
import ZoomInfoEdit from "./components/edit/ZoomInfoEdit";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email().min(3),
  secretKey: z.string().optional(),
  client_id: z.string().optional(),
  account_id: z.string().optional(),
  active: z.boolean().optional(),
})
export default function EditZoomAccountPage() {
  const form = useForm<ZoomAccountCreate>({
    initialValues: {
      name: '',
      email: '',
      secretKey: '',
      client_id: '',
      account_id: '',
      active: true,
      unitId: ""
    }, schema: zodResolver(schema)
  })
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
  const navigate = useNavigate()

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
  useEffect(() => {
    form.setFieldValue('name', account.name || '')
    form.setFieldValue('account_id', account.account_id || '')
    form.setFieldValue('client_id', account.client_id || '')
    form.setFieldValue('email', account.email || '')
    form.setFieldValue('unitId', account.ownerUnit && account.ownerUnit.id ? account.ownerUnit.id.toString() : '')
    form.setFieldValue('active', account.active)
    console.log(account.active)
  }, [account])

  const formSubmitHandler = (data: ZoomAccountCreate) => {
    setLoading(true)
    updateZoomAccount({ id: +id!, data }).then(res => {
      setAccount(res)
      showNotification({ title: 'Zoom Account Update', message: `Update Account Zoom success!`, color: 'green' })
      navigate(`/zoom-account/${id}`)
    }).catch(e => {
      showNotification({ title: 'Zoom Account Update', message: `Error! ${e.message}`, color: 'red' })
    }).finally(() => {
      setLoading(false)
    })
  }

  return <>
    <PageTitleComponent
      title="Update Data Zoom Account"
      breadcrumbs={breadcrumbs}
    />
    <Box style={{ position: "relative" }}>
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit(formSubmitHandler)}>
        <Grid mt={50}>
          <Grid.Col md={5} sm={12}>
            <ZoomInfoEdit form={form} />
          </Grid.Col>
          <Grid.Col md={7} sm={12}>
            <ZoomAccountGeneralInfoEdit form={form} />
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  </>
} 
