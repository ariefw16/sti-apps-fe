import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import { Device, DeviceFetchParams } from "./type";

export async function fetchDevice(
  params: DeviceFetchParams
): Promise<FetchResult<Device[]>> {
  try {
    const { q = "", limit = "", page = "" } = params;
    const result = await axios.get(`device?q=${q}&limit=${limit}&page=${page}`);
    return { data: result.data[0], rowCount: result.data[1] };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
