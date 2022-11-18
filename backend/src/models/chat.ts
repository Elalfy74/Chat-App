import { model, Schema } from "mongoose";
import { messageSchema } from "./message";

const chatSchema = new Schema({
  global: Boolean,
  members: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    required: true,
  },
  messages: [messageSchema],
  lastMessage: messageSchema,
});

const Chat = model("chat", chatSchema);

export default Chat;
