import { memo } from "react";

import { MessageParams } from "./Message.types";

const Message = ({ msg, fromCurrentUser, otherUser }: MessageParams) => {
  const wrapperClasses = `${fromCurrentUser && "self-end"} flex max-w-md gap-2`;
  const messageClasses = `${
    fromCurrentUser
      ? "rounded-tr-none bg-gray-700"
      : "rounded-tl-none bg-base-200"
  } px-2 py-2 rounded-lg text-sm`;

  return (
    <div className={wrapperClasses}>
      {!fromCurrentUser && (
        <img
          src={otherUser.avatarUrl}
          alt="avatar"
          className="w-10 h-10 rounded-full "
        />
      )}
      <div className={messageClasses}>{msg.text}</div>
    </div>
  );
};

export default memo(Message);
