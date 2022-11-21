import { Fragment, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import useHttp from "../../hooks/useHttp";
import { getAllMessages } from "../../services/chat";
import { MessageType, UserType } from "../../utils/global.type";
import socket from "../../utils/socket";
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
    if (messagesEndRef.current && otherUser) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [data, otherUser]);

  // Get All messages and listen to the new messages
  useEffect(() => {
    sendRequest({ token: currentUser?.token, chatId });

    socket.on(`${chatId}/messages`, (data) => {
      if (data.action === "create") {
        addData(data.message, "messages");
      }
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [currentUser?.token, chatId, addData, sendRequest]);

  return (
    <div className="flex flex-col justify-end flex-1 overflow-hidden border-r-2 scrollbar-hide border-r-base-300 bg-base-100 ">
      <div className="flex flex-col gap-4 px-2 pt-4 pb-4 overflow-auto scrollbar-hide">
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
    </div>
  );
};

export default MessagesList;
