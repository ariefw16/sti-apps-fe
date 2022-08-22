import { atom } from "recoil";
import { Incident } from "../../Incident/utils/type";

export const activeIncidentState = atom<Incident[]>({
  key: "activeIncidentState",
  default: [],
});
