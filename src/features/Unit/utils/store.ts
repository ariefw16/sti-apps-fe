import { atom } from "recoil";
import { FetchPagingFilter } from "../../../types/fetch.type";
import { DeleteUnit, Unit, UnitFilter, UpdateUnit } from "./type";

export const unitListState = atom<Unit[]>({
  key: "unitListState",
  default: [],
});
export const unitListCountState = atom<number>({
  key: "unitListCountState",
  default: 0,
});
export const unitPagingFilterState = atom<FetchPagingFilter>({
  key: "unitPagingFilterState",
  default: {
    limit: 15,
    page: 1,
  },
});
export const unitFilterState = atom<UnitFilter>({
  key: "unitFilterState",
  default: {
    parentId: null,
    search: "",
    toggleRefresh: false,
  },
});
export const unitDeleteModalState = atom<DeleteUnit>({
  key: "unitDeleteModalState",
  default: {
    showModal: false,
    data: { id: 0, name: "" },
  },
});
export const unitEditModalState = atom<UpdateUnit>({
  key: "unitEditModalState",
  default: {
    showModal: false,
    data: { name: "" },
  },
});
