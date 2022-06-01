import axios from "axios";
import { VPN, VPNFetchParams, VPNFetchResult } from "../types/vpn.type";

export async function fetchVPN(
  params: VPNFetchParams
): Promise<VPNFetchResult> {
  try {
    let query = "";
    if (params.limit) query += `limit=${params.limit}&`;
    if (params.page) query += `page=${params.page}&`;
    if (params.q) query += `q=${params.q}&`;
    if (params.unitId) query += `unitId=${params.unitId}&`;
    const result = await axios.get(`vpn?${query}`);
    return {
      data: result.data[0].map((x: any) => ({
        ...x,
        expiredDate: new Date(x.expiredDate),
        durationVariant: x.interval,
      })),
      rowCount: result.data[1],
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createVPN(data: VPN): Promise<VPN> {
  try {
    const { durationVariant: interval, ...all } = data;
    const result = await axios.post("vpn", {
      ...all,
      interval,
      userId: +data.userId!,
    });
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function extendsVPN(params: {
  id: number;
  duration: number;
  durationVariant: string;
}): Promise<VPN> {
  try {
    const { id, duration, durationVariant } = params;
    const result = await axios.patch(`vpn/${id}/extends`, {
      duration: +duration,
      interval: durationVariant,
    });
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteVPN(id: number) {
  try {
    const result = await axios.delete(`vpn/${id}`);
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateVPN(params: VPN): Promise<VPN> {
  try {
    const { id, ...data } = params;
    const result = await axios.patch(`vpn/${id}`, { ...data });
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
