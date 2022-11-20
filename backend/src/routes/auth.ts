import { Router } from "express";
import isAuth from "../middlewares/auth";
import * as AuthController from "../controllers/auth";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post("/signup", AuthController.signup);

router.post("/login", AuthController.login);

router.patch(
  "/update-user",
  [isAuth, upload.single("file")],
  AuthController.updateUser
);

export default router;
