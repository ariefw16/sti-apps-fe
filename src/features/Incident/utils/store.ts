import { atom } from "recoil";
import {
  ActivityCreation,
  Incident,
  IncidentDeletion,
  IncidentFetchParams,
} from "./type";

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

export const incidentDeletionState = atom<IncidentDeletion>({
  key: "incidentDeletionState",
  default: {
    showModal: false,
    data: { id: 0, name: "" },
  },
});

export const incidentActivityCreationState = atom<ActivityCreation>({
  key: "incidentActivityCreationState",
  default: {
    showModal: false,
    data: {},
  },
});
