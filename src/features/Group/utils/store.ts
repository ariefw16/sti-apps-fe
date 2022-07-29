import { atom } from "recoil";
import { FetchParams } from "../../../types/fetch.type";
import { Group } from "./type";

export const groupListState = atom<Group[]>({
  key: "groupListState",
  default: [],
});

export const groupListCountState = atom({
  key: "groupListCountState",
  default: 0,
});

export const groupListFilterState = atom<FetchParams>({
  key: "groupListFilterState",
  default: {
    page: 1,
    limit: 15,
  },
});
