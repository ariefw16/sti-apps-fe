import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import { CreateDevice, Device, DeviceFetchParams } from "./type";

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

export async function deleteDevice(id: number) {
  try {
    const result = await axios.delete(`device/${id}`);
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createDevice(data: CreateDevice) {
  try {
    const result = await axios.post("device", {
      ...data,
      unitId: +data.unitId!,
    });
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
