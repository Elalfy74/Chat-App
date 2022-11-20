import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import openSocket from "socket.io-client";

import { ChatType } from "../../../utils/global.type";

const ConversetionItem = ({ chat }: { chat: ChatType }) => {
  const [lastMessage, setLastMessage] = useState(chat.lastMessage);
  const params = useParams();
  const chatId = chat._id;

  // variable to add active class to the active chat
  const active = chatId === params["*"];

  const otherUser = chat.members[0];

  // Listening to websocket and update the last message
  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL!);

    socket.on(`${chatId}/messages`, (data) => {
      if (data.action === "create") {
        setLastMessage(data.message);
      }
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [chatId]);

  return (
    <Link to={`${chatId}`}>
      <div
        className={`${
          active && "bg-base-100"
        } flex cursor-pointer justify-between px-4 py-4 duration-300 hover:bg-base-200`}
      >
        <div className="flex items-center flex-1 gap-2">
          <img
            src={otherUser.avatarUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full "
          />
          <div className="hidden sm:block">
            <p className="font-normal text-slate-200">{otherUser.userName}</p>
            {lastMessage && <span className="text-sm">{lastMessage.text}</span>}
          </div>
        </div>
        <p className="hidden text-sm sm:block">12:00 PM</p>
      </div>
    </Link>
  );
};

export default ConversetionItem;
