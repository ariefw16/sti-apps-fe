import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import { Incident, IncidentFetchParams } from "./type";

export async function fetchIncidents(
  params: IncidentFetchParams
): Promise<FetchResult<Incident[]>> {
  try {
    const result = await axios.get("incident");
    return { data: result.data[0], rowCount: result.data[1] };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
