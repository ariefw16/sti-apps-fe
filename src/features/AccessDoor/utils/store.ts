import { atom } from "recoil";
import { FetchParams } from "../../../types/fetch.type";
import { AccessDoor } from "./type";

export const accessDoorListState = atom<AccessDoor[]>({
  key: "accessDoorListState",
  default: [],
});

export const accessDoorListFilterState = atom<FetchParams>({
  key: "accessDoorListFilterState",
  default: {
    page: 1,
    limit: 15,
  },
});

export const accessDoorListCountState = atom({
  key: "accessDoorListCountState",
  default: 0,
});
