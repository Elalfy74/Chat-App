import { memo } from "react";
type MessageParams = {
  msg: {
    _id: string;
    text: string;
    sender: {
      _id: string;
      userName: string;
      avatarUrl: string;
    };
  };
  fromCurrentUser: boolean;
};

const Message = ({ msg, fromCurrentUser }: MessageParams) => {
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
          src={msg.sender.avatarUrl}
          alt="avatar"
          className="w-10 h-10 rounded-full "
        />
      )}
      <div className={messageClasses}>{msg.text}</div>
    </div>
  );
};

export default memo(Message);
