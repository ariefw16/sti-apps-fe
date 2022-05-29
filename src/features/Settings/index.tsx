import { Tabs } from "@mantine/core";
import { useEffect } from "react";
import { Notification } from "tabler-icons-react";
import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import Notifications from "./components/Notifications";

export default function SettingPage() {
  const breadcrumbs: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Settings",
    },
  ];

  return (
    <>
      <PageTitleComponent
        title="Apps Global Setting"
        breadcrumbs={breadcrumbs}
      />
      <Tabs variant="pills" mt={40} ml={50} mr={40}>
        <Tabs.Tab label="Notifications" icon={<Notification size={14} />}>
          <Notifications />
        </Tabs.Tab>
      </Tabs>
    </>
  );
}
