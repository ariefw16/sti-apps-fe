import { atom } from "recoil";
import { Incident, IncidentFetchParams } from "./type";

export const incidentListState = atom<Incident[]>({
  key: "incidentListState",
  default: [],
});

export const incidentListFilterState = atom<IncidentFetchParams>({
  key: "incidentListFilterState",
  default: {},
});

export const incidentListCountState = atom({
  key: "incidentListCountState",
  default: 0,
});
