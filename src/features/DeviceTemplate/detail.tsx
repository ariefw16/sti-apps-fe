import { Tabs } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PageTitleComponent from "../../components/common/PageTitle";
import TabNav from "../../components/common/TabNav";
import { SelectOptions } from "../../types/common";
import { PageTitleBreadcrumbs } from "../../types/pagetitle.type";
import { fetchUnit } from "../Unit/utils/service";
import DeviceTemplateDevicesDetail from "./components/detail/DeviceTemplateDevDetail";
import DeviceTemplateGeneralInfoDetail from "./components/detail/DeviceTemplateGeneralDetail";
import QuickUpdateDeviceTemplate from "./components/detail/QuickUpdateDevice";
import { fetchSingleDeviceTemplate } from "./utils/service";
import {
  deviceTemplateDetailState,
  deviceTemplateLoadingDetailState,
  deviceTemplateQuickUpdateTriggreState,
} from "./utils/store";

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
  const { id } = useParams();
  const setTemplate = useSetRecoilState(deviceTemplateDetailState);
  const setLoading = useSetRecoilState(deviceTemplateLoadingDetailState);
  const trigger = useRecoilValue(deviceTemplateQuickUpdateTriggreState);
  const [unitOptions, setUnitOptions] = useState<SelectOptions[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchSingleDeviceTemplate(+id!)
      .then((res) => {
        setTemplate(res);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Single Device Type",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, trigger]);
  useEffect(() => {
    fetchUnit({ parentId: null })
      .then((res) => {
        setUnitOptions(
          res.data.map((d) => ({ value: d.id!.toString(), label: d.name! }))
        );
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Unit",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  }, [id]);

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
        <Tabs.Tab label="Devices">
          <DeviceTemplateDevicesDetail unitOptions={unitOptions} />
        </Tabs.Tab>
      </TabNav>
      <QuickUpdateDeviceTemplate unitOptions={unitOptions} />
    </>
  );
}
