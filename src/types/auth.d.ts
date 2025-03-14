import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IActivation {
  code: string;
}

interface IProfile {
  _id?: string;
  email?: string;
  fullName?: string;
  isActive?: boolean;
  role?: string;
  username?: string;
  profilePicture?: string | FileList;
}

interface IUpdatePassword {
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

interface ILogin {
  identifier: string;
  password: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

export type {
  IRegister,
  IActivation,
  ILogin,
  IProfile,
  IUpdatePassword,
  JWTExtended,
  SessionExtended,
  UserExtended,
};
