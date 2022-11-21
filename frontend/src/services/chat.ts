import axios from "../lib/axios";
import {
  GetChatParams,
  GetMessagesParams,
  SendMessageParams,
} from "./chat.types";

export const getAllChats = ({ token }: { token: string }) => {
  return axios.get("chat", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getChat = ({ token, otherUserName }: GetChatParams) => {
  return axios.get(`chat/${otherUserName}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllMessages = (params: GetMessagesParams) => {
  const { token, chatId } = params;

  return axios.get(`chat/messages/${chatId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sendMessage = ({ token, text, chatId }: SendMessageParams) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParameters = {
    text,
    chatId,
  };

  return axios.post("chat/messages/create-msg", bodyParameters, config);
};
