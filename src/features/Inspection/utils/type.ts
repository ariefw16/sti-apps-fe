import { FetchParams } from "../../../types/fetch.type";
import { Device } from "../../Devices/utils/type";
import { DeviceType } from "../../DeviceType/utils/type";
import {
  InspectionTemplate,
  InspectionTemplateDetail,
} from "../../InspectionTemplate/utils/type";
import { Unit } from "../../Unit/utils/type";
import { User } from "../../Users/utils/type";

export interface Inspection {
  id?: number;
  name?: string;
  deviceId?: number;
  deviceTypeId?: number;
  inspectedById?: number;
  inspectionDate?: Date;
  unitId?: number;
  templateId?: number;
  device?: Device;
  deviceType?: DeviceType;
  inspectedBy?: User;
  template?: InspectionTemplate;
  unit?: Unit;
  DeviceInspectionDetail?: InspectionDetail;
}

export interface InspectionDetail {
  id?: number;
  name?: string;
  inputType?: string;
  required?: boolean;
  value?: string;
  inspectionId?: number;
  detailTemplateId?: number;
  inspection?: Inspection;
  detailTemplate?: InspectionTemplateDetail;
}

export interface InspectionFetchParams extends FetchParams {
  deviceTypeId?: string | null;
  deviceId?: string | null;
  unitId?: string | null;
}
