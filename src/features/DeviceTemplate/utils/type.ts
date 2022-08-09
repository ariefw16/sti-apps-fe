import { DataToDelete } from "../../../types/common";
import { FetchParams } from "../../../types/fetch.type";
import { DeviceType, DeviceTypeSpec } from "../../DeviceType/utils/type";

export interface DeviceTemplate {
  id?: number;
  name?: string;
  deviceTypeId?: number;
  deviceType?: DeviceType;
  DeviceTypeSpecs?: DeviceTemplateSpec[];
  _count?: {
    devices?: number;
  };
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
