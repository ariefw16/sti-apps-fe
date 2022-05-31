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
