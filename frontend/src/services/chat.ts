import axios from "axios";

import {
  GetChatParams,
  GetMessagesParams,
  SendMessageParams,
} from "./chat.types";

export const getAllChats = ({ token }: { token: string }) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL!}/chat`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getChat = ({ token, otherUserName }: GetChatParams) => {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL!}/chat/${otherUserName}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getAllMessages = ({ token, chatId }: GetMessagesParams) => {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL!}/chat/messages/${chatId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const sendMessage = ({ token, text, chatId }: SendMessageParams) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParameters = {
    text,
    chatId,
  };

  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL!}/chat/messages/create-msg`,
    bodyParameters,
    config
  );
};
