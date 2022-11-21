import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import useHttp from "../../hooks/useHttp";
import { getAllChats } from "../../services/chat";
import { ChatType } from "../../utils/global.type";
import socket from "../../utils/socket";
import ChatDetails from "./ChatDetails";
import LeftSideBar from "./LeftSideBar/LeftSideBar";

const Chat = () => {
  const { currentUser } = useAuth();

  const parmas = useParams();
  const chatId = parmas["*"];

  const { data, sendRequest, addData } = useHttp(getAllChats, true);

  // Get all Chats and length if there is new Chat
  useEffect(() => {
    sendRequest({
      token: currentUser?.token,
    });

    socket.on(`chat/${currentUser?.userId}`, (data) => {
      if (data.action === "create") {
        addData(data.chat, "chats");
      }
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [sendRequest, currentUser?.token, addData, currentUser?.userId]);

  let otherUserChat;

  /* Get the Other User From Chat and pass him to the Chat Details to show his info 
  in the Messages
  */
  if (data && chatId) {
    otherUserChat = data.chats.find((chat: ChatType) => chat._id === chatId);
  }

  const otherUser = otherUserChat && otherUserChat.members[0];

  return (
    <div className="flex h-[800px] max-h-[80%] w-[1000px] max-w-[95%] rounded-lg bg-base-300">
      <LeftSideBar chats={data && data.chats} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex-1 py-2 mt-10 text-center">
              <h2 className="mb-4 text-2xl font-bold text-center">Chat App</h2>
              <p className="text-center">Please Select a Chat</p>
            </div>
          }
        ></Route>
        <Route path=":chatId" element={<ChatDetails otherUser={otherUser} />} />
      </Routes>
    </div>
  );
};

export default Chat;
