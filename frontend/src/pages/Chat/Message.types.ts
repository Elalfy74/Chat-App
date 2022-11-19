import {
  MessageType,
  MessageWithSenderType,
  UserType,
} from "../../utils/global.type";

export type MessageParams = {
  msg: MessageWithSenderType | MessageType;
  fromCurrentUser: boolean;
  otherUser: UserType;
};
