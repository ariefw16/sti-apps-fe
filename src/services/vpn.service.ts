import axios from "axios";
import { VPN, VPNFetchParams, VPNFetchResult } from "../types/vpn.type";

export async function fetchVPN(
  params: VPNFetchParams
): Promise<VPNFetchResult> {
  try {
    const result = await axios.get("vpn");
    return {
      data: result.data[0].map((x: any) => ({
        ...x,
        expiredDate: new Date(x.expiredDate),
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
