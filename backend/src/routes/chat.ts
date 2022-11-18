import { Router } from "express";
import * as ChatController from "../controllers/chat";
import isAuth from "../middlewares/auth";

const router = Router();

router.get("/messages/:chatId", isAuth, ChatController.getMessages);

router.post("/create-msg", isAuth, ChatController.createMessage);

router.get("/", isAuth, ChatController.getChats);

router.post("/create-chat", isAuth, ChatController.createChat);

export default router;
