import axios from "axios";
import { FetchParams, FetchResult } from "../../../types/fetch.type";
import { AccessDoor } from "./type";

export async function fetchAccessDoor(
  params: FetchParams
): Promise<FetchResult<AccessDoor[]>> {
  try {
    const { page, limit } = params;
    const result = await axios.get(`access-door?page=${page}&limit=${limit}`);
    return { data: result.data[0], rowCount: result.data[1] };
  } catch (e: any) {
    throw new Error(e.message);
  }
}
