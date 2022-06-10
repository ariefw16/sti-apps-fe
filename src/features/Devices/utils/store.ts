import { atom } from "recoil";
import { DeleteDevice, Device, DeviceFetchParams, DeviceSpec } from "./type";

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

export const deviceDeleteModalState = atom<DeleteDevice>({
  key: "deviceDeleteModalState",
  default: {
    showModal: false,
    data: { id: 0, name: "" },
  },
});

export const deviceSpecCreateState = atom<DeviceSpec[]>({
  key: "deviceSpecCreateState",
  default: [],
});

export const deviceTypeIdCreateState = atom<number>({
  key: "deviceTypeIdCreateState",
  default: undefined,
});
