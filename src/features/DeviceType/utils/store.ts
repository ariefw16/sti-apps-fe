import { atom } from "recoil";
import { FetchParams } from "../../../types/fetch.type";
import {
  DeviceType,
  DeviceTypeDelete,
  DeviceTypeSpecsCreate,
  DeviceTypeSpecsDelete,
  DeviceTypeSpecsUpdate,
  DeviceTypeUpdate,
} from "./type";

export const deviceTypeListState = atom<DeviceType[]>({
  key: "deviceTypeListState",
  default: [],
});

export const deviceTypeListCountState = atom({
  key: "deviceTypeListCountState",
  default: 0,
});

export const deviceTypeListFilterState = atom<FetchParams>({
  key: "deviceTypeListFilterState",
  default: {},
});

export const deviceTypeCreateModalState = atom({
  key: "deviceTypeCreateModalState",
  default: false,
});

export const deviceTypeUpdateModalState = atom<DeviceTypeUpdate>({
  key: "deviceTypeUpdateModalState",
  default: {
    showModal: false,
    data: {},
  },
});

export const deviceTypeDeleteModalState = atom<DeviceTypeDelete>({
  key: "deviceTypeDeleteModalState",
  default: { showModal: false, data: { id: 0, name: "" } },
});

export const deviceTypeState = atom<DeviceType>({
  key: "deviceTypeState",
  default: {},
});

export const specsCreateModalState = atom<DeviceTypeSpecsCreate>({
  key: "specsCreateModalState",
  default: {
    showModal: false,
    data: {},
  },
});

export const specsDeleteModalState = atom<DeviceTypeSpecsDelete>({
  key: "specsDeleteModalState",
  default: {
    showModal: false,
    data: { id: 0, name: "" },
  },
});

export const specsUpdateModalState = atom<DeviceTypeSpecsUpdate>({
  key: "specsUpdateModalState",
  default: {
    showModal: false,
    data: {},
  },
});
