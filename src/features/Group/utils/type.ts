import { User } from "../../Users/utils/type";

export interface Group {
  id?: number;
  name?: string;
  users?: User[];
}
