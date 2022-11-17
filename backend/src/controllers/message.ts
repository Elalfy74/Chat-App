import { Request, Response, NextFunction } from "express";
import Message from "../models/message";
import User from "../models/user";
import { isCatchError } from "../utils/catch-error";
import io from "../utils/socket";

type CreateMessageBody = {
  text: string;
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { text }: CreateMessageBody = req.body;

  const message = new Message({
    text,
    sender: req.userId,
  });

  try {
    const result = await message.save();
    const user = await User.findById(req.userId);

    io.getIO().emit("messages", {
      action: "create",
      message: {
        ...message.toJSON(),
        sender: {
          _id: req.userId,
          name: user?.userName,
          avatarUrl: user?.avatarUrl,
        },
      },
    });

    res.status(201).json({
      message: "Message Sent Succefully !",
      msg: result,
    });
  } catch (err) {
    if (isCatchError(err) && !err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await Message.find().populate("sender");
    res.status(200).json({
      messages,
    });
  } catch (err) {
    if (isCatchError(err) && !err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export default { create, getMessages };
