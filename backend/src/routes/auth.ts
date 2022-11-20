import { Router } from "express";
import isAuth from "../middlewares/auth";
import * as AuthController from "../controllers/auth";
import multer from "multer";

const router = Router();

router.post("/signup", AuthController.signup);

router.post("/login", AuthController.login);

router.patch(
  "/update-user",
  [isAuth, multer().single("file")],
  AuthController.updateUser
);

export default router;
