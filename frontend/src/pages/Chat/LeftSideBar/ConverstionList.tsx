import { ChatsType } from "../../../utils/global.type";
import ConversetionItem from "./ConversetionItem";

const ConverstionList = ({ chats }: { chats: ChatsType | undefined }) => {
  return (
    <div className="scrollbar-hide h-[70%] overflow-auto pb-2">
      {chats &&
        chats.length > 0 &&
        chats.map((chat) => <ConversetionItem key={chat._id} chat={chat} />)}
    </div>
  );
};

export default ConverstionList;
