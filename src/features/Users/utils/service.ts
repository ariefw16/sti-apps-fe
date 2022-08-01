import axios from "axios";
import { DataToDelete } from "../../../types/common";
import { FetchResult } from "../../../types/fetch.type";
import { User, UserCreateData, UserFilter, UserUpdateData } from "./type";

export async function fetchUser(
  params: UserFilter
): Promise<FetchResult<User[]>> {
  try {
    const { limit = 0, page: pageRaw = 1, q = "", unitId } = params;
    const page = pageRaw - 1;
    let url = `user?limit=${limit}&page=${page}&q=${q}`;
    if (unitId) url = url + `&unitId=${unitId}`;
    const response = await axios.get(url);
    return { data: response.data[0], rowCount: response.data[1] };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function quickFetchUser(q: string): Promise<User[]> {
  try {
    const result = await axios.get(`user/quick?q=${q}`);
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function createUser(data: UserCreateData) {
  try {
    const response = await axios.post<User>("user", {
      ...data,
      unitId: data.unitId ? +data.unitId : null,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteUser(data: DataToDelete) {
  try {
    await axios.delete(`user/${data.id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateUser(data: UserUpdateData) {
  try {
    const { id, ...body } = data;
    const response = await axios.patch<User>(`user/${id}`, {
      ...body,
      unitId: body.unitId ? +body.unitId : null,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchProfile(): Promise<User> {
  try {
    const res = await axios.get(`user/profile`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
