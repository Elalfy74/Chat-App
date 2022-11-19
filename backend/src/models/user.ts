import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";
import { IUser, UserModel, IUserMethods } from "./user.types";
import Joi, { string } from "joi";
import { CustomError } from "../utils/global.types";

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: String,
});

userSchema.method("generateAuth", function generateAuth() {
  return jwt.sign(
    { userId: this._id, userName: this.userName },
    config.get("jsonWebToken")
  );
});

const User = model<IUser, UserModel>("User", userSchema);

export const validateUser = (user: IUser) => {
  const schema = Joi.object({
    userName: Joi.string().required().min(3).max(30),
    password: Joi.string().required().min(5).max(30),
  });

  const { error: validationError } = schema.validate(user);

  if (validationError) {
    const error = new Error(validationError.details[0].message) as CustomError;
    error.statusCode = 401;
    return error;
  }
};

export default User;
