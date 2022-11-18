import LeftBar from "./LeftBar";
import ChatForm from "./ChatForm";
import MessagesList from "./MessagesList";

const Chat = () => {
  return (
    <div className="flex rounded-lg bg-base-300 h-[800px] max-h-[80%]">
      <LeftBar />
      <div className="w-[800px] flex flex-col">
        {/*Heading*/}
        <div className="py-2">
          <h2 className="text-2xl font-bold text-center">Chat App</h2>
          <p className="text-center">12 Members</p>
        </div>
        <MessagesList />
        <ChatForm />
      </div>
    </div>
  );
};

export default Chat;
