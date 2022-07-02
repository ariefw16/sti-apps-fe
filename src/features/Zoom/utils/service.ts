import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import { ZoomAccount, ZoomAccountFetchParams } from "./type";

export async function fetchZoomAccount(props: ZoomAccountFetchParams): Promise<FetchResult<ZoomAccount[]>> {
  try {
    let { q = "", page = "", limit = "" } = props
    const res = await axios.get(`zoom-account?q=${q}&page=${page}&limit=${limit}`)
    return { rowCount: res.data[1], data: res.data[1] }
  } catch (e: any) {
    throw new Error(e.message)
  }
}
