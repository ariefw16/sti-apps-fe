import axios from "axios";
import { AuthData, AuthParams } from "./type";

export async function login(params: AuthParams): Promise<AuthData> {
  try {
    const { username, password } = params;
    const res = await axios.post("auth", { username, password });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function logout(callback: any) {
  axios.defaults.headers.common["Authorization"] = "";
  localStorage.setItem("accessToken", "");
  callback();
}
