import { atom } from "recoil";
import { Inspection, InspectionFetchParams } from "./type";

export const inspectionListState = atom<Inspection[]>({
  key: "inspectionListState",
  default: [],
});

export const inspectionListFilterState = atom<InspectionFetchParams>({
  key: "inspectionListFilterState",
  default: {
    page: 1,
    limit: 15,
  },
});

export const inspectionListCountState = atom({
  key: "inspectionListCountState",
  default: 0,
});
