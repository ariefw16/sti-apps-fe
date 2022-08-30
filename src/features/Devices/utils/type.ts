import { DataToDelete } from "../../../types/common";
import { FetchParams } from "../../../types/fetch.type";
import { DeviceType, DeviceTypeSpec } from "../../DeviceType/utils/type";
import { Unit } from "../../Unit/utils/type";

export interface Device {
  id?: number;
  name?: string;
  ipAddress?: string;
  isSpare?: boolean;
  unitId?: number;
  unit?: Unit;
  deviceTypeId?: number;
  deviceType?: DeviceType;
  DeviceSpecs?: DeviceSpec[];
  serialNumber?: string;
  merk?: string;
}

export interface DeviceSpec {
  id?: number;
  name?: string;
  value?: string;
  specType?: string;
  deviceTypeSpec?: DeviceTypeSpec;
  deviceTypeSpecId?: number;
}

export interface DeviceFetchParams extends FetchParams {
  unitId?: string | null;
  deviceTypeId?: string | null;
  isSpare?: string | null;
}

export interface DeleteDevice {
  showModal: boolean;
  data: DataToDelete;
}

export interface CreateDevice {
  name?: string;
  ipAddress?: string;
  isSpare?: boolean;
  unitId?: string;
  deviceTypeId?: number;
  deviceSpecs?: DeviceSpec[];
  id?: number;
  serialNumber?: string;
  merk?: string;
}
