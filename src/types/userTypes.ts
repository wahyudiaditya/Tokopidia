import { ObjectId } from "mongodb";

export type UserType = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserTypeWithId = {
  _id: string;
  name: string;
  username: string;
  email: string;
};

export type UserLoginType = {
  email: string;
  password: string;
};

export type UserJwt = {
  _id: ObjectId;
  email: string;
  name: string;
  username: string;
};

export type UserProfile = {
  name: string;
  username: string;
  message?: string;
};

export type LogoutType = {
  name: string;
  message: string;
};
