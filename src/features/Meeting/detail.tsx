import { Grid } from "@mantine/core"
import PageTitleComponent from "../../components/common/PageTitle"
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type"

export default function DetailMeetingPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: 'Home',
      to: '/'
    },
    {
      label: 'Meetings Management',
      to: '/meetings'
    }, {
      label: 'Detail'
    }
  ]
  return <>
    <PageTitleComponent breadcrumbs={breadcrumbs} title="Meeting Detail" />
    <Grid mt={50}>
      <Grid.Col sm={12} md={4}>
      </Grid.Col>
      <Grid.Col sm={12} md={8}>
        <Grid>
          <Grid.Col span={12}>
          </Grid.Col>
          <Grid.Col span={12}>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  </>
}
