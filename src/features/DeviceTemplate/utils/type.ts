import { DataToDelete } from "../../../types/common";
import { FetchParams } from "../../../types/fetch.type";
import { Device } from "../../Devices/utils/type";
import { DeviceType, DeviceTypeSpec } from "../../DeviceType/utils/type";

export interface DeviceTemplate {
  id?: number;
  name?: string;
  deviceTypeId?: number;
  deviceType?: DeviceType;
  DeviceTemplateSpecs?: DeviceTemplateSpec[];
  _count?: {
    devices?: number;
  };
  devices?: Device[];
  merk?: string;
}

export interface CreateDeviceTemplate {
  name?: string;
  deviceTypeId?: string;
  deviceTemplateSpecs?: DeviceTemplateSpec[];
  devices?: DeviceTemplateDevsCreate[];
  merk?: string;
}

export interface DeviceTemplateDevsCreate {
  serialNumber: string;
  unitId?: string | null;
  unitName?: string;
  isSpare?: boolean;
  ipAddress?: string;
}

export interface DeviceTemplateSpec {
  id?: number;
  name?: string;
  value?: string;
  specType?: string;
  deviceTypeSpec?: DeviceTypeSpec;
  deviceTypeSpecId?: number;
}

export interface DeviceTemplateFetchParams extends FetchParams {
  deviceTypeId?: string | null;
}

export interface DeleteDeviceTemplate {
  showModal: boolean;
  data: DataToDelete;
}

export interface QuickUpdateDevice {
  showModal: boolean;
  data: Device;
}
