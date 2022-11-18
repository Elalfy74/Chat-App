import LeftBar from "./LeftBar/LeftBar";
import ChatForm from "./ChatForm";
import MessagesList from "./MessagesList";

const Chat = () => {
  return (
    <div className="flex rounded-lg bg-base-300 h-[800px] max-h-[80%] w-[1000px] max-w-[95%]">
      <LeftBar />
      <div className="flex flex-col flex-1">
        {/*Heading*/}
        <div className="flex justify-between px-4 py-4 duration-300 ">
          <div className="flex items-center flex-1 gap-2">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
              className="w-10 h-10 rounded-full "
            />
            <p className="font-normal text-slate-200">Mahmoud ELalfy</p>
          </div>
        </div>
        {/* <div className="py-2">
          <h2 className="text-2xl font-bold text-center">Chat App</h2>
          <p className="text-center">12 Members</p> */}
        {/* </div> */}
        <MessagesList />
        <ChatForm />
      </div>
    </div>
  );
};

export default Chat;
