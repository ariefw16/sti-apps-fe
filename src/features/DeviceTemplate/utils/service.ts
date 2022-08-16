import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import { Device } from "../../Devices/utils/type";
import {
  CreateDeviceTemplate,
  DeviceTemplate,
  DeviceTemplateDevsCreate,
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
      //map devices (change unitId from string to number)
      devices: data.devices
        ? data.devices.map((d) => ({
            ...d,
            unitId: d.unitId ? +d.unitId : undefined,
          }))
        : undefined,
      //map template spec input data body
      deviceTemplateSpecs: data.deviceTemplateSpecs
        ? data.deviceTemplateSpecs?.map((t) => ({
            deviceTypeSpecId: t.deviceTypeSpec?.id,
            value: t.value,
            name: t.name,
          }))
        : undefined,
      deviceTypeId: data.deviceTypeId ? +data.deviceTypeId : undefined,
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function addDeviceToDeviceTemplate(
  id: number,
  data: DeviceTemplateDevsCreate
): Promise<Device[]> {
  try {
    const dt = [];
    dt.push({ ...data, unitId: data.unitId ? +data.unitId : undefined });
    const result = await axios.post(`device-template/device/${id}`, {
      data: dt,
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
