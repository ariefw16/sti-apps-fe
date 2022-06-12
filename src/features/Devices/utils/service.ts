import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import { CreateDevice, Device, DeviceFetchParams } from "./type";

export async function fetchDevice(
  params: DeviceFetchParams
): Promise<FetchResult<Device[]>> {
  try {
    let {
      q = "",
      limit = "",
      page = "",
      deviceTypeId = "",
      unitId = "",
      isSpare = "",
    } = params;
    if (unitId === null) unitId = "";
    if (deviceTypeId === null) deviceTypeId = "";
    if (isSpare === null) isSpare = "";
    const result = await axios.get(
      `device?q=${q}&limit=${limit}&page=${page}` +
        `&isSpare=${isSpare}&unitId=${unitId}&deviceTypeId=${deviceTypeId}`
    );
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

export async function fetchSingleDevice(id: number): Promise<Device> {
  try {
    const result = await axios.get(`/device/${id}`);
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateDevice(params: CreateDevice): Promise<Device> {
  try {
    const { id, ...data } = params;
    const res = await axios.patch(`device/${id}`, {
      ...data,
      unitId: +data.unitId!,
    });
    return res.data;
  } catch (error: any) {
    throw Error(error.message);
  }
}
