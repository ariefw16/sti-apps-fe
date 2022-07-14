import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import { Meeting, MeetingsFetchParams } from "./type";

export async function fetchMeeting(params: MeetingsFetchParams): Promise<FetchResult<Meeting[]>> {
  try {
    let { q = "", page = "", limit = "", status = "" } = params
    if (status === null) status = ""
    const result = await axios.get(`zoom-meeting?q=${q}&page=${page}&limit=${limit}&status=${status}`)
    return { data: result.data[0], rowCount: result.data[1] }
  } catch (e: any) {
    throw new Error(e.message)
  }
}

export async function deleteMeeting(id: number) {
  try {
    await axios.delete(`zoom-meeting/${id}`)
    return id
  } catch (e: any) {
    throw new Error(e.message)
  }
}
