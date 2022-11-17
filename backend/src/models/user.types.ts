import { Model } from "mongoose";

export interface IUser {
  userName: string;
  password: string;
  avatarUrl: string;
}

export interface IUserMethods {
  generateAuth(): string;
}

export type UserModel = Model<IUser, {}, IUserMethods>;
