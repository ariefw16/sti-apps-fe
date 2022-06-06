import { DataToDelete } from "../../../types/common";

export interface DeviceType {
  id?: number;
  name?: string;
  DeviceTypeSpec?: DeviceTypeSpec[];
}

export interface DeviceTypeSpec {
  id?: number;
  name?: string;
  isMandatory?: boolean;
  specType?: string;
  deviceTypeId?: number;
  DeviceTypeSpecChoice?: DeviceTypeSpecChoice[];
}

export interface DeviceTypeSpecChoice {
  id?: number;
  value?: string;
  deviceTypeSpecId?: number;
}

export interface DeviceTypeUpdate {
  showModal: boolean;
  data: DeviceType;
}

export interface DeviceTypeDelete {
  showModal: boolean;
  data: DataToDelete;
}

export interface DeviceTypeSpecsCreate {
  showModal: boolean;
  data: DeviceTypeSpec;
}

export interface DeviceTypeSpecsDelete {
  showModal: boolean;
  data: DataToDelete;
}
