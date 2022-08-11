import { atom } from "recoil";
import {
  DeleteDeviceTemplate,
  DeviceTemplate,
  DeviceTemplateFetchParams,
  QuickUpdateDevice,
} from "./type";

export const deviceTemplateListState = atom<DeviceTemplate[]>({
  key: "deviceTemplateListState",
  default: [],
});

export const deviceTemplateListCountState = atom({
  key: "deviceTemplateListCountState",
  default: 0,
});

export const deviceTemplateListFilterState = atom<DeviceTemplateFetchParams>({
  key: "deviceTemplateListFilterState",
  default: {
    page: 1,
    limit: 15,
  },
});

export const deviceTemplateDeletionState = atom<DeleteDeviceTemplate>({
  key: "deviceTemplateDeletionState",
  default: {
    showModal: false,
    data: {
      id: 0,
      name: "",
    },
  },
});

export const deviceTemplateDetailState = atom<DeviceTemplate>({
  key: "deviceTemplateDetailState",
  default: {},
});

export const deviceTemplateLoadingDetailState = atom({
  key: "deviceTemplateLoadingDetailState",
  default: false,
});

export const deviceTemplateQuickUpdateDeviceState = atom<QuickUpdateDevice>({
  key: "deviceTemplateQuickUpdateDeviceState",
  default: {
    showModal: false,
    data: {
      serialNumber: "",
      id: 0,
    },
  },
});

export const deviceTemplateQuickUpdateTriggreState = atom({
  key: "deviceTemplateQuickUpdateTriggreState",
  default: false,
});
