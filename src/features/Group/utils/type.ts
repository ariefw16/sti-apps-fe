import { DataToDelete } from "../../../types/common";
import { User } from "../../Users/utils/type";

export interface Group {
  id?: number;
  name?: string;
  initial?: string;
  users?: { user: User }[];
  _count?: {
    users: number;
  };
}

export interface GroupCreate {
  showModal: boolean;
  data: {
    name: string;
    initial: string;
  };
}

export interface GroupDelete {
  showModal: boolean;
  data: DataToDelete;
}

export interface GroupUpdate {
  showModal: boolean;
  data: Group;
}

export interface GroupManageMember {
  showModal: boolean;
  id: number;
}
