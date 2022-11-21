import { useState } from "react";
import { SlLogout } from "react-icons/sl";

import ChatWithUsers from "../../../components/ChatWithUsers";
import ModalPortal from "../../../components/Modal";
import { useAuth } from "../../../contexts/AuthContext";
import { ChatsType } from "../../../utils/global.type";
import ConverstionList from "./ConverstionList";
import CurrentUser from "./CurrentUser";

const LeftSideBar = ({ chats }: { chats: ChatsType }) => {
  const { handleLogout } = useAuth();
  const [modal, setShowModal] = useState(false);

  return (
    <div className="relative w-fit border-r border-l border-r-gray-500 border-l-base-300 sm:w-[300px] ">
      {modal && (
        <ModalPortal hideModal={() => setShowModal(false)}>
          <ChatWithUsers hideModal={() => setShowModal(false)} />
        </ModalPortal>
      )}
      <CurrentUser showModal={() => setShowModal(true)} />
      <ConverstionList chats={chats} />
      <div className="absolute left-[50%] bottom-3 flex w-full -translate-x-1/2 justify-center pt-3">
        <button className="btn w-[80%] sm:w-[90%]" onClick={handleLogout}>
          <span className="hidden sm:block">Logout</span>
          <SlLogout className="h-4 w-4 sm:hidden" />
        </button>
      </div>
    </div>
  );
};

export default LeftSideBar;
