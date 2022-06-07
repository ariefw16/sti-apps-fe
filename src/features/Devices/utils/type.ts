import { FetchParams } from "../../../types/fetch.type";

export interface Device {
  id?: number;
  name?: string;
}

export interface DeviceFetchParams extends FetchParams {}
