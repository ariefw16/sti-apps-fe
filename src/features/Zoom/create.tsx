import { Grid } from "@mantine/core"
import PageTitleComponent from "../../components/common/PageTitle"
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type"
import ZoomAccountGeneralInfoCard from "./components/create/ZoomAccountGeneralInfoCard"
import ZoomInfoCard from "./components/create/ZoomInfoCard"
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { ZoomAccountCreate } from './utils/type'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email().min(3),
  secretKey: z.string().optional(),
  client_id: z.string().optional(),
  account_id: z.string().optional(),
  active: z.boolean().optional(),
})
export default function CreateZoomAccountPage() {
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
  const breadcrumb: PageTitleBreadcrumbs[] = [
    {
      label: 'Home',
      to: '/'
    },
    {
      label: 'Zoom Account Management',
      to: '/zoom-account'
    }, {
      label: 'Create new Account',
    }
  ]

  const submitFormHandler = (data: ZoomAccountCreate) => {
    console.log(data)
  }

  return <>
    <PageTitleComponent breadcrumbs={breadcrumb} title="Create Zoom Account" />
    <form onSubmit={form.onSubmit(submitFormHandler)}>
      <Grid mt={50}>
        <Grid.Col md={5} sm={12}>
          <ZoomInfoCard form={form} />
        </Grid.Col>
        <Grid.Col md={7} sm={12}>
          <ZoomAccountGeneralInfoCard form={form} />
        </Grid.Col>
      </Grid>
    </form>
  </>
}
