import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import openSocket from "socket.io-client";

import { useAuth } from "../../contexts/AuthContext";
import useHttp from "../../hooks/useHttp";
import { getAllMessages } from "../../services/chat";
import { MessageType, UserType } from "../../utils/global.type";
import Message from "./Message";

const MessagesList = ({ otherUser }: { otherUser: UserType | undefined }) => {
  const { currentUser } = useAuth();
  const { chatId } = useParams();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { sendRequest, addData, data, loading, error } = useHttp(
    getAllMessages,
    true
  );

  // Scroll To Bottom
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView();
    };
    scrollToBottom();
  }, [data]);

  // Get All messages and listen to the new messages
  useEffect(() => {
    sendRequest({ token: currentUser?.token, chatId });
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL!);

    socket.on(`${chatId}/messages`, (data) => {
      if (data.action === "create") {
        addData(data.message, "messages");
      }
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [currentUser?.token, sendRequest, addData, chatId]);

  return (
    <div className=" scrollbar-hide flex max-h-[700px] flex-1 flex-col justify-end gap-4 overflow-auto border-r-2 border-r-base-300 bg-base-100 px-2 pb-4 pt-4  ">
      {otherUser &&
        data &&
        data.messages.map((msg: MessageType) => (
          <Message
            key={msg._id}
            msg={msg}
            fromCurrentUser={msg.sender === currentUser?.userId}
            otherUser={otherUser}
          />
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;
