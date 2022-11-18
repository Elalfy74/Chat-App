import { Request, Response, NextFunction } from "express";
import Chat from "../models/chat";
import Message from "../models/message";
import User from "../models/user";
import { isCatchError } from "../utils/catch-error";
import { CustomError } from "../utils/global.types";
import io from "../utils/socket";

type CreateMessageBody = {
  text: string;
  chatId: string;
};

export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { otherUser } = req.body;

  try {
    const chat = new Chat({
      members: [userId, otherUser],
    });

    await chat.save();

    res.status(200).json({
      message: "Chat is Created Succfully",
    });
  } catch (err) {
    if (isCatchError(err) && !err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  try {
    const chats = await Chat.find({
      members: userId,
    })
      .select({ lastMessage: 1, members: 1 })
      .populate({
        path: "members",
        match: { _id: { $ne: userId } },
        select: "avatarUrl userName",
      });

    res.status(200).json({
      chats,
    });
  } catch (err) {
    if (isCatchError(err) && !err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text, chatId }: CreateMessageBody = req.body;

  const message = new Message({
    text,
    sender: req.userId,
  });

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      const error = new Error("Couldn't Find Chat") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    chat.messages.push(message);
    chat.lastMessage = message;
    await chat.save();

    const newMessage = await message.populate("sender");

    io.getIO().emit(`${chatId}/messages`, {
      action: "create",
      message: newMessage,
    });

    res.status(201).json({
      message: "Message Sent Succefully !",
    });
  } catch (err) {
    if (isCatchError(err) && !err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const chatId = req.params.chatId;

  try {
    const chatMessages = await Chat.findById(chatId).select({
      messages: 1,
    });

    if (!chatMessages) {
      const error = new Error("Couldn't Find Chat") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      messages: chatMessages?.messages,
    });
  } catch (err) {
    if (isCatchError(err) && !err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
