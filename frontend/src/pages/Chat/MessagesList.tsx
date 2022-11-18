import { useEffect, useRef } from "react";
import useHttp from "../../hooks/useHttp";
import { getMessages } from "../../services/chat";
import Message from "./Message";
import openSocket from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";

const MessagesList = () => {
  const { currentUser } = useAuth();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { sendRequest, addData, data, loading, error } = useHttp(
    getMessages,
    true
  );

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView();
    };
    scrollToBottom();
  }, [data]);

  useEffect(() => {
    sendRequest(currentUser?.token);
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL!);

    socket.on("messages", (data) => {
      if (data.action === "create") {
        addData(data.message);
      }
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [currentUser?.token, sendRequest, addData]);

  return (
    <div className=" bg-base-100 flex flex-col flex-1 gap-4 max-h-[700px] overflow-auto px-2 pb-4 scrollbar-hide border-r-2 border-r-base-300 pt-4  ">
      {data &&
        data.messages.map((msg: any) => (
          <Message
            key={msg._id}
            msg={msg}
            fromCurrentUser={msg.sender._id === currentUser?.userId}
          />
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;
