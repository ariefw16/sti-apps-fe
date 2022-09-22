import { DataToDelete } from "../../../types/common";
import { FetchParams } from "../../../types/fetch.type";
import { DeviceType } from "../../DeviceType/utils/type";
import { User } from "../../Users/utils/type";

export interface InspectionTemplate {
  id?: number;
  name?: string;
  deviceType?: DeviceType;
  deviceTypeId?: number;
  createdBy?: User;
  createdById?: number;
  active?: boolean;
  DeviceInspectionTemplateDetail?: InspectionTemplateDetail[];
}

export interface InspectionTemplateDetail {
  id?: number;
  name?: string;
  description?: string;
  inputType?: string;
  required?: boolean;
}

export interface InspectionTemplateFetchParams extends FetchParams {
  deviceTypeId?: string | null;
}

export interface InspectionTemplateDelete {
  showModal: boolean;
  data: DataToDelete;
}
