import axios from "axios";
import moment from "moment";
import { FetchResult } from "../../../types/fetch.type";
import {
  Meeting,
  MeetingCreate,
  MeetingsFetchParams,
  MeetingUpdate,
} from "./type";

export async function fetchMeeting(
  params: MeetingsFetchParams
): Promise<FetchResult<Meeting[]>> {
  try {
    let {
      q = "",
      page = "",
      limit = "",
      status = "",
      zoomAccountId = "",
    } = params;
    if (status === null) status = "";
    if (zoomAccountId === null) status = "";
    const result = await axios.get(
      `zoom-meeting?q=${q}&page=${page}&limit=${limit}&status=${status}&zoomAccountId=${zoomAccountId}`
    );
    return { data: result.data[0], rowCount: result.data[1] };
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function deleteMeeting(id: number) {
  try {
    await axios.delete(`zoom-meeting/${id}`);
    return id;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function saveMeeting(props: MeetingCreate): Promise<Meeting> {
  try {
    const { startDateTime, ...data } = props;
    const result = await axios.post("zoom-meeting", {
      ...data,
      jbhTime: +data.jbhTime!,
      startDate:
        moment(data.startDate).format("YYYY-MM-DD") +
        " " +
        moment(startDateTime).format("HH:mm"),
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function approveMeeting(data: {
  id: number;
  zoomAccountId?: string | null;
}): Promise<Meeting> {
  try {
    const { id, zoomAccountId } = data;
    const result = await axios.post(`zoom-meeting/approve`, {
      id,
      zoomAccountId: +zoomAccountId!,
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
}

export async function cancelMeeting(id: number): Promise<Meeting> {
  try {
    const result = await axios.post(`zoom-meeting/cancel/${id}`);
    return result.data;
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
}

export async function fetchSingleMeeting(id: number): Promise<Meeting> {
  try {
    const result = await axios.get(`zoom-meeting/${id}`);
    return result.data;
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
}

export async function updateMeeting(props: {
  id: number;
  data: MeetingUpdate;
}): Promise<Meeting> {
  try {
    const { id, data } = props;
    const { jbhTimeString, ...params } = data;
    const result = await axios.patch(`zoom-meeting/${id}`, {
      ...params,
      jbhTime: +data.jbhTimeString!,
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
}
