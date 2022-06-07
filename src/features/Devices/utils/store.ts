import { atom } from "recoil";
import { Device, DeviceFetchParams } from "./type";

export const deviceListState = atom<Device[]>({
  key: "deviceListState",
  default: [],
});

export const deviceListFilterState = atom<DeviceFetchParams>({
  key: "deviceListFilterState",
  default: {},
});

export const deviceListCountState = atom({
  key: "deviceListCountState",
  default: 0,
});
