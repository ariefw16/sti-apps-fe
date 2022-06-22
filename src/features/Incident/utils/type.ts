import { DataToDelete } from "../../../types/common";
import { FetchParams } from "../../../types/fetch.type";
import { Device } from "../../Devices/utils/type";
import { Unit } from "../../Unit/utils/type";
import { User } from "../../Users/utils/type";

export interface Incident {
  id?: number;
  name?: string;
  eventDate?: Date;
  eventId?: string;
  eventNote?: string;
  triggerType?: string;
  resolveDate?: Date;
  resolveNote?: string;
  reportedBy?: User;
  device?: Device;
  unit?: Unit;
  isDone?: boolean;
  reportedById?: number;
  deviceId?: number;
  unitId?: number;
  incidentLog?: IncidentLog[];
  incidentActivity?: IncidentActivity[];
}

export interface IncidentLog {
  id?: number;
  value?: string;
  logDate?: Date;
  incident?: Incident;
  incidentId?: number;
}

export interface IncidentActivity {
  id?: number;
  name?: string;
  description?: string;
  activityDate?: Date;
  user?: User;
  incident?: Incident;
  userId?: number;
  incidentId?: number;
}

export interface IncidentFetchParams extends FetchParams {
  unitId?: string | null;
  isDone?: string | null;
  deviceTypeId?: string | null;
}

export interface IncidentDeletion {
  showModal: boolean;
  data: DataToDelete;
}

export interface ActivityCreation {
  showModal: boolean;
  data: IncidentActivity;
}

export interface ActivityListModal {
  showModal: boolean;
  data?: IncidentActivity[];
  incidentId?: number;
}
