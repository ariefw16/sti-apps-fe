import PageTitleComponent from "../../components/common/PageTitle";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";

export default function IncidentPage() {
  const breadcrumb: PageTitleBreadcrumbs[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Incidents",
    },
  ];
  return (
    <>
      <PageTitleComponent title="Incidents" breadcrumbs={breadcrumb} />
    </>
  );
}
