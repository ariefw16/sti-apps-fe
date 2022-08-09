import { Tabs } from "@mantine/core";
import PageTitleComponent from "../../components/common/PageTitle";
import TabNav from "../../components/common/TabNav";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import DeviceTemplateDevicesDetail from "./components/detail/DeviceTemplateDevDetail";
import DeviceTemplateGeneralInfoDetail from "./components/detail/DeviceTemplateGeneralDetail";
import DeviceTemplateSpecificationsDetail from "./components/detail/DeviceTemplateSpecDetail";

export default function DetailDeviceTemplate() {
  const breadcrumb: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Device Management",
      to: "/device",
    },
    {
      label: "Device Template",
    },
  ];

  return (
    <>
      <PageTitleComponent
        breadcrumbs={breadcrumb}
        title="Detail Device Template"
      />
      <TabNav mt={30}>
        <Tabs.Tab label="General Info">
          <DeviceTemplateGeneralInfoDetail />
        </Tabs.Tab>
        <Tabs.Tab label="Specifications">
          <DeviceTemplateSpecificationsDetail />
        </Tabs.Tab>
        <Tabs.Tab label="Devices">
          <DeviceTemplateDevicesDetail />
        </Tabs.Tab>
      </TabNav>
    </>
  );
}
