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
