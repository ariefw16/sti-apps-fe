import { DataToDelete } from "../../../types/common";
import { FetchParams } from "../../../types/fetch.type";

export interface Unit {
  id?: number;
  name?: string;
  parent?: Unit;
  childs?: Unit[];
}

export interface UnitFetchParams extends FetchParams {
  parentId: string | null;
  q?: string;
}

export interface UnitFilter {
  parentId: string | null;
  search?: string;
  toggleRefresh?: boolean;
}

export interface UnitParent {
  id?: string;
  name?: string;
}

export interface CreateUnit {
  name: string;
  parentId?: string;
  id?: number;
  parent?: Unit;
}

export interface DeleteUnit {
  showModal: boolean;
  data?: DataToDelete;
}

export interface UpdateUnit {
  showModal: boolean;
  data?: CreateUnit;
}
