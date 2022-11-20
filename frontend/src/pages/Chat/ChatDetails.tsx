import { UserType } from "../../utils/global.type";
import ChatForm from "./ChatForm";
import MessagesList from "./MessagesList";

const ChatDetails = ({ otherUser }: { otherUser: UserType | undefined }) => {
  return (
    <div className="flex flex-col flex-1">
      {/*Heading*/}
      <div className="flex justify-between px-4 py-4 duration-300 ">
        <div className="flex items-center flex-1 gap-2">
          <img
            src={otherUser && otherUser.avatarUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full "
          />
          <p className="font-normal text-slate-200">
            {otherUser && otherUser.userName}
          </p>
        </div>
      </div>
      {<MessagesList otherUser={otherUser} />}
      <ChatForm />
    </div>
  );
};

export default ChatDetails;
