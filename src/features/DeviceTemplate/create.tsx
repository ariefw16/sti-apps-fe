import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import DeviceTemplateGeneralCreate from "./components/create/DeviceTemplateGeneralCreate";

export default function CreateDeviceTemplate() {
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
      label: "Create Device Template",
    },
  ];
  return (
    <>
      <PageTitleComponent
        breadcrumbs={breadcrumb}
        title="Create Device Template"
      />
      <DeviceTemplateGeneralCreate />
    </>
  );
}
