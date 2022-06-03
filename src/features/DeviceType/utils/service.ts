import axios from "axios";
import { DataToDelete } from "../../../types/common";
import { FetchParams, FetchResult } from "../../../types/fetch.type";
import { DeviceType } from "./type";

export async function fetchDeviceType(
  params: FetchParams
): Promise<FetchResult<DeviceType[]>> {
  try {
    const { q = "", limit = "", page = "" } = params;
    const result = await axios.get(
      `device-type?q=${q}&limit=${limit}&page=${page}`
    );
    return { data: result.data[0], rowCount: result.data[1] };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createDeviceType(
  params: DeviceType
): Promise<DeviceType> {
  try {
    const result = await axios.post("device-type", params);
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateSimpleDeviceType(
  params: DeviceType
): Promise<DeviceType> {
  try {
    const { id, ...data } = params;
    const result = await axios.patch(`device-type/${id}`, data);
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function deleteDeviceType(params: DataToDelete) {
  try {
    const res = await axios.delete(`device-type/${params.id}`);
    return { params };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
