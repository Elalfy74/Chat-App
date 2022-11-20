import { MessageType, UserType } from "../../utils/global.type";

export type MessageParams = {
  msg: MessageType;
  fromCurrentUser: boolean;
  otherUser: UserType;
};
