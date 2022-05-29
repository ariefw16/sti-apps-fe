import { atom } from "recoil";
import {
  User,
  UserCreateModal,
  UserDelete,
  UserFilter,
  UserUpdateModal,
} from "../types/user.type";

export const userListState = atom<User[]>({
  key: "userListState",
  default: [],
});

export const userListCountState = atom({
  key: "userListCountState",
  default: 0,
});

export const userListFilterState = atom<UserFilter>({
  key: "userListFilterState",
  default: {
    unitId: null,
  },
});

export const userDeleteState = atom<UserDelete>({
  key: "userDeleteState",
  default: {
    showModal: false,
    data: { id: 0, name: "" },
  },
});

export const userCreateState = atom<UserCreateModal>({
  key: "userCreateState",
  default: { showModal: false, data: {} },
});

export const userUpdateState = atom<UserUpdateModal>({
  key: "userUpdateState",
  default: {
    showModal: false,
    data: {},
  },
});
