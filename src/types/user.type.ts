import { DataToDelete } from "./common";
import { FetchParams } from "./fetch.type";
import { Unit } from "./unit.type";

export interface User {
  id: number;
  name?: string;
  username?: string;
  email?: string;
  unit?: Unit;
  nik?: string;
}

export interface UserFetchParams extends FetchParams {
  unitId: string | null;
}

export interface UserFilter extends FetchParams {
  q?: string;
  unitId: string | null;
  refreshToggle?: boolean;
}

export interface UserDelete {
  showModal: boolean;
  data: DataToDelete;
}

export interface UserCreateData {
  name?: string;
  username?: string;
  email?: string;
  unitId?: string;
  nik?: string;
  password?: string;
}

export interface UserCreateModal {
  showModal: boolean;
  data: UserCreateData;
}

export interface UserUpdateData extends UserCreateData {
  id?: number;
  unit?: Unit;
}

export interface UserUpdateModal {
  showModal: boolean;
  data: UserUpdateData;
}
