import { Box, LoadingOverlay } from "@mantine/core";
import { useState } from "react";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import DeviceListCard from "./components/DeviceListCard";

export default function DevicePage() {
  const breadcrumb: PageTitleBreadcrumbs[] = [
    { label: "Home", to: "/" },
    { label: "Device Management" },
  ];
  const [loading, setLoading] = useState(false);

  return (
    <>
      <PageTitleComponent title="Device Management" breadcrumbs={breadcrumb} />
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <DeviceListCard />
      </Box>
    </>
  );
}
