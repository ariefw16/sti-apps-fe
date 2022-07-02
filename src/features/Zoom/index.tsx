import { Box, LoadingOverlay } from "@mantine/core";
import { useState } from "react";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import ZoomAccountListCard from "./components/list/ZoomAccountListCard";

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

  return <>
    <PageTitleComponent title="Zoom Account Management" breadcrumbs={breadcrumbs} />
    <Box style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />
      <ZoomAccountListCard />
    </Box>
  </>
} 
