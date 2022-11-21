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

  const [scrollToBottom, setScrollToBottom] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["messages", chatId],
      ({ pageParam }) =>
        getAllMessages({
          token: currentUser?.token!,
          chatId: chatId!,
          pageParam,
        }),
      {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        refetchOnMount: false,
        getNextPageParam: (lastPage, pages) => pages.length + 1,
      }
    );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const targetOffset =
      0.3 * (e.currentTarget.scrollHeight - e.currentTarget.offsetHeight);

    if (scrollTop <= targetOffset) {
      console.log("We passed the target");
    }
  };

  // Scroll To Bottom
  useEffect(() => {
    if (messagesEndRef.current && otherUser && scrollToBottom) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [data, otherUser, scrollToBottom]);

  // Get All messages and listen to the new messages
  useEffect(() => {
    socket.on(`${chatId}/messages`, (data) => {
      if (data.action === "create") {
        // addData(data.message, "messages");
      }
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [currentUser?.token, chatId]);

  return (
    <div className="flex flex-col justify-end flex-1 overflow-hidden border-r-2 scrollbar-hide border-r-base-300 bg-base-100 ">
      <div
        className="flex flex-col gap-4 px-2 pt-4 pb-4 overflow-auto scrollbar-hide"
        onScroll={handleScroll}
      >
        {otherUser && (
          <>
            {data?.pages.map((group, i) => (
              <Fragment key={i}>
                {group.map((msg: MessageType) => (
                  <Message
                    key={msg._id}
                    msg={msg}
                    fromCurrentUser={msg.sender === currentUser?.userId}
                    otherUser={otherUser}
                  />
                ))}
                <div ref={messagesEndRef} />
              </Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesList;
