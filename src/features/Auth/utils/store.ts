import { atom } from "recoil";
import { AuthData } from "./type";

export const authState = atom<AuthData>({ key: "authState", default: {} });
