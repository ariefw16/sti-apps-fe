import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import { InspectionTemplate, InspectionTemplateFetchParams } from "./type";

export async function fetchInspectionTemplate(
  params: InspectionTemplateFetchParams
): Promise<FetchResult<InspectionTemplate[]>> {
  try {
    const { q = "", page, limit } = params;
    const result = await axios.get(
      `device-inspection-template?q=${q}&page=${page}&limit=${limit}`
    );
    return { data: result.data[0], rowCount: result.data[1] };
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function deleteInspectionTemplate(id: number) {
  try {
    const result = await axios.delete(`device-inspection-template/${id}`);
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function fetchSingleInspectionTemplate(
  id: number
): Promise<InspectionTemplate> {
  try {
    const result = await axios.get(`device-inspection-template/${id}`);
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
