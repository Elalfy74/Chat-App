import { Router } from "express";
import * as ChatController from "../controllers/chat";
import isAuth from "../middlewares/auth";

const router = Router();

router.get("/", isAuth, ChatController.getAllChats);

router.get("/:otherUserName", isAuth, ChatController.getChat);

router.post("/create-chat", isAuth, ChatController.createChat);

router.get("/messages/:chatId", isAuth, ChatController.getMessages);

router.post("/messages/create-msg", isAuth, ChatController.createMessage);

export default router;
