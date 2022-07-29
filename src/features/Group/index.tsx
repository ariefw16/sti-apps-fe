import PageTitleComponent from "../../components/common/PageTitle";
import { Box, LoadingOverlay } from "@mantine/core";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import { useState } from "react";
import IncidentListCard from "../Incident/components/list/IncidentListCard";
import GroupListCard from "./components/list/GroupListCard";

export default function GroupPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "User Group Management",
    },
  ];
  const [loading, setLoading] = useState(false);

  return (
    <>
      <PageTitleComponent
        title="User Group Management"
        breadcrumbs={breadcrumbs}
      />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <GroupListCard />
      </Box>
    </>
  );
}
