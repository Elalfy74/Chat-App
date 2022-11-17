import { Router } from "express";
import MessageController from "../controllers/message";
import isAuth from "../middlewares/auth";

const router = Router();

router.get("/", isAuth, MessageController.getMessages);

router.post("/create-msg", isAuth, MessageController.create);

export default router;
