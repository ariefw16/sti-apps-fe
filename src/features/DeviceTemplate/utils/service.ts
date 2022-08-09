import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import { DeviceTemplate, DeviceTemplateFetchParams } from "./type";

export async function fetchDeviceType(
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
