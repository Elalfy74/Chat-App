import Joi from "joi";
import { Schema, model } from "mongoose";
import { CustomError } from "../utils/global.types";

const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model("message", messageSchema);

export const validateMessage = (message: string) => {
  const schema = Joi.object({
    text: Joi.string().required(),
  });

  const { error: validationError } = schema.validate(message);

  if (validationError) {
    const error = new Error(validationError.details[0].message) as CustomError;
    error.statusCode = 401;
    return error;
  }
};
export default Message;
