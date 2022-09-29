import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import { Inspection, InspectionFetchParams } from "./type";

export async function FetchInspection(
  params: InspectionFetchParams
): Promise<FetchResult<Inspection[]>> {
  try {
    const { q, limit, page } = params;
    const result = await axios.get(
      `device-inspection?q=${q}&limit=${limit}&page=${page}`
    );
    return { data: result.data[0], rowCount: result.data[1] };
  } catch (e: any) {
    throw new Error(e.message);
  }
}
