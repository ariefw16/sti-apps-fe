import { DataToDelete } from "../../../types/common";
import { User } from "../../Users/utils/type";

export interface Group {
  id?: number;
  name?: string;
  users?: User[];
}

export interface GroupCreate {
  showModal: boolean;
  data: {
    name: string;
  };
}

export interface GroupDelete {
  showModal: boolean;
  data: DataToDelete;
}
