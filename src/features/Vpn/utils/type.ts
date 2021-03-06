import { DataToDelete } from "../../../types/common";
import { FetchParams } from "../../../types/fetch.type";
import { User } from "../../Users/utils/type";

export interface VPN {
  id?: number;
  username?: string;
  user?: User;
  userId?: string;
  password?: string;
  createdDate?: Date;
  createdBy?: User;
  createdById?: string;
  expiredDate?: Date;
  duration?: string;
  durationVariant?: string;
}

export interface VPNFetchParams extends FetchParams {
  unitId?: string;
  activeStatus?: "0" | "1";
}

export interface VPNFetchResult {
  data: VPN[];
  rowCount: number;
}

export interface CreateVPNData {
  username?: string;
  userId?: string;
  password?: string;
  duration?: string;
  durationVariant?: "days" | "week" | "month";
  createdById?: string; //temporary
  expiredDate?: Date;
}

export interface CreateVPN {
  showModal: boolean;
  data: VPN;
}

export interface ExtendsVPN {
  showModal: boolean;
  data: VPN;
}

export interface DeleteVPN {
  showModal: boolean;
  data: DataToDelete;
}

export interface UpdateVPN {
  showModal: boolean;
  data: VPN;
}
