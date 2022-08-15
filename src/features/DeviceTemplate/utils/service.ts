import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import {
  CreateDeviceTemplate,
  DeviceTemplate,
  DeviceTemplateFetchParams,
} from "./type";

export async function fetchDeviceTemplate(
  params: DeviceTemplateFetchParams
): Promise<FetchResult<DeviceTemplate[]>> {
  try {
    let { q = "", limit = "", page = "", deviceTypeId = "" } = params;
    if (deviceTypeId === null) deviceTypeId = "";
    const result = await axios.get(
      `device-template?q=${q}&limit=${limit}&page=${page}` +
        `&deviceTypeId=${deviceTypeId}`
    );
    return { data: result.data[0], rowCount: result.data[1] };
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function deleteDeviceTemplate(id: number) {
  try {
    await axios.delete(`device-template/${id}`);
    return id;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function fetchSingleDeviceTemplate(
  id: number
): Promise<DeviceTemplate> {
  try {
    const result = await axios.get(`device-template/${id}`);
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function saveDeviceTemplate(
  data: CreateDeviceTemplate
): Promise<DeviceTemplate> {
  try {
    const result = await axios.post("device-template", {
      ...data,
      deviceTypeId: data.deviceTypeId ? +data.deviceTypeId : undefined,
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
