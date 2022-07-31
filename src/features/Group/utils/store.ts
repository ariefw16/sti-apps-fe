import { atom } from "recoil";
import { FetchParams } from "../../../types/fetch.type";
import { Group, GroupCreate, GroupDelete, GroupUpdate } from "./type";

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

export const groupCreateState = atom<GroupCreate>({
  key: "groupCreateState",
  default: {
    showModal: false,
    data: {
      name: "",
    },
  },
});

export const groupDeleteState = atom<GroupDelete>({
  key: "groupDeleteState",
  default: {
    showModal: false,
    data: {
      id: 0,
      name: "",
    },
  },
});

export const groupUpdateState = atom<GroupUpdate>({
  key: "groupUpdateState",
  default: {
    showModal: false,
    data: {
      name: "",
    },
  },
});
