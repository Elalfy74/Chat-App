import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import User, { validateUser } from "../models/user";
import { CustomError } from "../utils/global.types";

import { SignupBody, LoginBody } from "./auth.types";
import { isCatchError } from "../utils/catch-error";

import { uploadImg } from "../utils/upload-img";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, password }: SignupBody = req.body;

  try {
    const validateError = validateUser(req.body);
    if (validateError) throw validateError;

    // Check If the User Exist
    const savedUser = await User.findOne({ userName });
    if (savedUser) {
      const error = new Error("Username Already Exist!") as CustomError;
      error.statusCode = 401;
      throw error;
    }

    // Create New User
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      userName,
      password: hashedPw,
      avatarUrl: "https://www.w3schools.com/howto/img_avatar.png",
    });

    await user.save();
    const token = user.generateAuth();

    res.status(201).json({
      token,
      userId: user._id.toString(),
      userName,
      avatarUrl: user.avatarUrl,
    });
  } catch (err) {
    if (isCatchError(err) && !err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, password }: LoginBody = req.body;

  try {
    const validateError = validateUser(req.body);
    if (validateError) throw validateError;

    // Check if the user exist
    const user = await User.findOne({ userName });
    if (!user) {
      const error = new Error("Invalid Username or Password") as CustomError;
      error.statusCode = 401;
      throw error;
    }

    // Check if the password correct
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Invalid Username or Password") as CustomError;
      error.statusCode = 401;
      throw error;
    }

    const token = user.generateAuth();
    res.status(200).json({
      token: token,
      userId: user._id.toString(),
      userName,
      avatarUrl: user.avatarUrl,
    });
  } catch (err) {
    if (isCatchError(err) && !err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file;

  const updateInMongo = async (url: any) => {
    const imgUrl = url[0];
    console.log(typeof url);
    console.log(imgUrl);
    await User.findByIdAndUpdate(req.userId, {
      avatarUrl: imgUrl,
    });

    res.status(200).json({
      message: "Avatar Changed Successfully",
      newAvatar: imgUrl,
    });
  };

  if (file) {
    try {
      uploadImg(file, updateInMongo);
    } catch (err) {
      if (isCatchError(err) && !err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};
