export type GetChatParams = {
  token: string;
  otherUserName: string;
};

export type GetMessagesParams = {
  token: string;
  chatId: string;
};

export type SendMessageParams = {
  token: string;
  text: string;
  chatId: string;
};
