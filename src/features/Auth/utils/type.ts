import { User } from "../../Users/utils/type";

export interface AuthData {
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}

export interface AuthParams {
  username?: string;
  password?: string;
}
