import { DataToDelete } from "../../../types/common";
import { FetchParams } from "../../../types/fetch.type";
import { Unit } from "../../Unit/utils/type";

export interface ZoomAccount {
  id?: number;
  name?: string;
  email?: string;
  accessToken?: string;
  secretKey?: string;
  client_id?: string;
  account_id?: string;
  lastCheck?: Date;
  active?: boolean;
  ownerUnit?: Unit;
  unitId?: number;
  tokenExpiredAt?: Date;
  maxParticipant?: number;
}

export interface ZoomAccountFetchParams extends FetchParams {
  active?: string | null;
  unitId?: string | null;
}

export interface ZoomAccountDelete {
  showModal: boolean;
  data: DataToDelete;
}

export interface ZoomAccountCreate {
  id?: number;
  name?: string;
  email?: string;
  secretKey?: string;
  client_id?: string;
  account_id?: string;
  active?: boolean;
  unitId?: string;
  maxParticipant?: number;
}

export interface ZoomAccountTestConnection {
  showModal: boolean;
  id: number;
}

export interface ZoomAccountRecord {
  uuid?: string;
  id?: number;
  account_id?: string;
  host_id?: string;
  topic?: string;
  type?: number;
  start_time?: Date;
  timezone?: string;
  duration?: number;
  total_size?: number;
  recording_count?: number;
  share_url?: string;
}

export interface ZoomAccountRecordDownload {
  topic?: string;
  share_url?: string;
  password?: string;
  recording_files?: ZoomAccountRecordDownloadFiles[];
}

export interface ZoomAccountRecordDownloadFiles {
  id?: string;
  file_type?: string;
  download_url?: string;
  recording_type?: string;
}
