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
