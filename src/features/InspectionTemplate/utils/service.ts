import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import {
  CreateInspectionTemplate,
  InspectionTemplate,
  InspectionTemplateDetail,
  InspectionTemplateFetchParams,
} from "./type";

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

export async function saveChecklistInspection(data: InspectionTemplateDetail) {
  try {
    const result = await axios.post("device-inspection-template/detail", {
      ...data,
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function saveInspectionTemplate(
  data: CreateInspectionTemplate
): Promise<InspectionTemplate> {
  try {
    const result = await axios.post("device-inspection-template", {
      name: data.name,
      deviceTypeId: data.deviceTypeId ? +data.deviceTypeId : undefined,
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function deleteInspectionTemplateDetail(id: number) {
  try {
    const result = await axios.delete(
      `device-inspection-template/detail/${id}`
    );
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function updateInspectionTemplate(
  id: number,
  data: CreateInspectionTemplate
): Promise<InspectionTemplate> {
  try {
    const result = await axios.patch(`device-inspection-template/${id}`, {
      ...data,
      deviceTypeId: data.deviceTypeId ? +data.deviceTypeId : undefined,
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function updateChecklistInspectionTemplate(
  data: InspectionTemplateDetail
) {
  const { id, ...body } = data;
  try {
    const result = await axios.patch(
      `device-inspection-template/detail/${id}`,
      {
        ...body,
      }
    );
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
