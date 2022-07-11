import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import { ZoomAccount, ZoomAccountFetchParams } from "./type";

export async function fetchZoomAccount(props: ZoomAccountFetchParams): Promise<FetchResult<ZoomAccount[]>> {
  try {
    let { q = "", page = "", limit = "" } = props
    const res = await axios.get(`zoom-account?q=${q}&page=${page}&limit=${limit}`)
    return { rowCount: res.data[1], data: res.data[0] }
  } catch (e: any) {
    throw new Error(e.message)
  }
}

export async function deleteZoomAccount(id: number): Promise<number> {
  try {
    const res = await axios.delete(`zoom-account/${id}`)
    return id
  } catch (e: any) {
    throw new Error(e.message)
  }
}

export async function fetchSingleZoomAccount(id: number): Promise<ZoomAccount> {
  try {
    const res = await axios.get(`zoom-account/${id}`)
    return res.data
  } catch (e: any) {
    throw new Error(e.message)
  }
}
