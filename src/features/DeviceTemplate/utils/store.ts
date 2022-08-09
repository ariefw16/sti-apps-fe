import { atom } from "recoil";
import {
  DeleteDeviceTemplate,
  DeviceTemplate,
  DeviceTemplateFetchParams,
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
