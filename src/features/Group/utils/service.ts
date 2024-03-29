import axios from "axios";
import { FetchParams, FetchResult } from "../../../types/fetch.type";
import { AddRemoveGroupMember, Group } from "./type";

export async function fetchGroup(
  props: FetchParams
): Promise<FetchResult<Group[]>> {
  try {
    let { q = "", page = "", limit = "" } = props;
    const result = await axios.get(`groups?q=${q}&page=${page}&limit=${limit}`);
    return { data: result.data[0], rowCount: result.data[1] };
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function saveGroup(data: Group): Promise<Group> {
  try {
    const result = await axios.post("groups", data);
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function deleteGroup(id: number): Promise<number> {
  try {
    await axios.delete(`groups/${id}`);
    return id;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function updateGroup(id: number, data: Group): Promise<Group> {
  try {
    const result = await axios.patch(`groups/${id}`, data);
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function fetchSingleGroup(id: number): Promise<Group> {
  try {
    const result = await axios.get(`groups/${id}`);
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function addMemberToGroup(data: AddRemoveGroupMember) {
  try {
    const { id, userId } = data;
    const userIds: number[] = [];
    userIds.push(userId);
    const result = await axios.patch(`groups/user/${id}`, { userIds });
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function removeMemberGroup(data: AddRemoveGroupMember) {
  try {
    const { userId } = data;
    const userIds: number[] = [];
    userIds.push(userId);
    const result = await axios.post(`groups/user`, { userIds });
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
