import axios from "axios";
import { DataToDelete } from "../types/common";
import { FetchResult } from "../types/fetch.type";
import {
  CreateUnit,
  Unit,
  UnitFetchParams,
  UnitParent,
} from "../types/unit.type";

export async function fetchUnit(
  params: UnitFetchParams
): Promise<FetchResult<Unit[]>> {
  try {
    const { limit, page: pageRaw = 1, q, parentId } = params;
    const page = pageRaw - 1;
    const result = await axios.get(
      `unit?limit=${limit}&page=${page}&q=${q || ""}&parentId=${
        parentId !== null ? parentId : ""
      }`
    );
    return { data: result.data[0], rowCount: result.data[1] };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchParentUnit(params: {
  unitId?: string;
}): Promise<UnitParent[]> {
  try {
    const { unitId = "" } = params;
    const result = await axios.get(`unit/parents?unitId=${unitId}`);
    return result.data.map((x: any) => ({ ...x, id: x.id.toString() }));
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function saveUnit(params: CreateUnit): Promise<CreateUnit> {
  try {
    const result = await axios.post("unit", {
      ...params,
      parentId: params.parentId ? parseInt(params.parentId) : undefined,
    });
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteUnit(params: DataToDelete) {
  try {
    const result = await axios.delete(`unit/${params.id}`);
    return params;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateUnit(params: CreateUnit): Promise<Unit> {
  try {
    const { id, ...data } = params;
    const result = await axios.patch(`unit/${params.id}`, {
      ...data,
      parentId: data.parentId ? +data.parentId : null,
    });
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
