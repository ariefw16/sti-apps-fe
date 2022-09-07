import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import {
  ZoomAccount,
  ZoomAccountCreate,
  ZoomAccountFetchParams,
  ZoomAccountRecord,
} from "./type";

export async function fetchZoomAccount(
  props: ZoomAccountFetchParams
): Promise<FetchResult<ZoomAccount[]>> {
  try {
    let { q = "", page = "", limit = "" } = props;
    const res = await axios.get(
      `zoom-account?q=${q}&page=${page}&limit=${limit}`
    );
    return { rowCount: res.data[1], data: res.data[0] };
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function deleteZoomAccount(id: number): Promise<number> {
  try {
    await axios.delete(`zoom-account/${id}`);
    return id;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function fetchSingleZoomAccount(id: number): Promise<ZoomAccount> {
  try {
    const res = await axios.get(`zoom-account/${id}`);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function createZoomAccount(
  data: ZoomAccountCreate
): Promise<ZoomAccount> {
  try {
    const result = await axios.post("zoom-account", {
      ...data,
      unitId: +data?.unitId!,
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function updateZoomAccount(props: {
  id: number;
  data: ZoomAccountCreate;
}): Promise<ZoomAccount> {
  try {
    if (!props.data.secretKey) delete props.data.secretKey;
    const result = await axios.patch(`zoom-account/${props.id}`, {
      ...props.data,
      unitId: props.data.unitId ? +props.data?.unitId : undefined,
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function testZoomAccountConnection(id: number) {
  try {
    const result = await axios.get(`zoom-account/tc/${id}`);
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function fetchZoomAccountRecording(props: {
  month: string;
  year: string;
  id: number;
}): Promise<ZoomAccountRecord[]> {
  try {
    const { month, year, id } = props;
    const result = await axios.get(
      `zoom-account/rec/${id}?from=${year}-${month}-01&to=${year}-${month}-31`
    );
    return result.data.meetings;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
