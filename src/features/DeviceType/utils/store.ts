import { atom } from "recoil";
import { FetchParams } from "../../../types/fetch.type";
import { DeviceType } from "./type";

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
