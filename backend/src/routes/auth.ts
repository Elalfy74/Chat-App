import { Router } from "express";
import * as AuthController from "../controllers/auth";

const router = Router();

router.post("/signup", AuthController.signup);

router.post("/login", AuthController.login);

export default router;
