import { atom } from "recoil";
import { DeviceTemplate, DeviceTemplateFetchParams } from "./type";

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
