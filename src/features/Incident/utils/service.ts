import axios from "axios";
import { FetchResult } from "../../../types/fetch.type";
import { Incident, IncidentActivity, IncidentFetchParams } from "./type";

export async function fetchIncidents(
  params: IncidentFetchParams
): Promise<FetchResult<Incident[]>> {
  try {
    let {
      q = "",
      limit = 15,
      page = "",
      isDone,
      deviceTypeId,
      unitId,
    } = params;
    if (unitId === null || unitId === undefined) unitId = "";
    if (deviceTypeId === null || deviceTypeId === undefined) deviceTypeId = "";
    if (isDone === null || isDone === undefined) isDone = "";
    const result = await axios.get(
      `incident?q=${q}&page=${page}&limit=${limit}&unitId=${unitId}&deviceTypeId=${deviceTypeId}&isDone=${isDone}`
    );
    return { data: result.data[0], rowCount: result.data[1] };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateIncident(
  id: number,
  data: Incident
): Promise<Incident> {
  try {
    const res = await axios.patch(`incident/${id}`, data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function addActivity(
  props: IncidentActivity
): Promise<IncidentActivity> {
  try {
    const result = await axios.post(`incident/activity/${props.incidentId}`, {
      ...props,
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function fetchActivity(
  incidentId: number
): Promise<IncidentActivity[]> {
  try {
    const result = await axios.get(`incident/activity/${incidentId}`);
    return result.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function fetchSingleIncident(id: number): Promise<Incident> {
  try {
    const res = await axios.get(`incident/${id}`);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function fetchActiveIncident(): Promise<Incident[]> {
  try {
    const res = await axios.get(`incident?isDone=0`);
    return res.data[0];
  } catch (e: any) {
    throw new Error(e.message);
  }
}
