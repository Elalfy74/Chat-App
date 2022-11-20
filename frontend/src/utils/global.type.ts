export type UserType = {
  _id: string;
  avatarUrl: string;
  userName: string;
};

export type CurrentUserType = Omit<UserType, "_id"> & {
  token: string;
  userId: string;
};

export type MessageType = {
  _id: string;
  text: string;
  sender: string;
  createdAt: string;
  updatedAt: string;
};

export type ChatType = {
  _id: string;
  //other Member
  members: [UserType];
  lastMessage?: MessageType;
};

export type ChatsType = ChatType[] | [];
