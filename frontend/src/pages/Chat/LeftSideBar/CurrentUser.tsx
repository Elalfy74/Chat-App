import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import AccountSettings from "../../../components/AccountSettings";
import ModalPortal from "../../../components/Modal";
import { useAuth } from "../../../contexts/AuthContext";

const CurrentUser = ({ showModal }: { showModal: () => void }) => {
  const { currentUser } = useAuth();
  const [accountModal, setAccountModal] = useState(false);

  const showAccountModal = () => {
    setAccountModal(true);
  };

  return (
    <>
      {accountModal && (
        <ModalPortal hideModal={() => setAccountModal(false)}>
          <AccountSettings hideModal={() => setAccountModal(false)} />
        </ModalPortal>
      )}
      <div className="flex flex-col items-center justify-between gap-1 px-3 py-5 mb-4 border-b border-b-gray-500 sm:flex-row">
        <div className="flex items-center gap-2">
          <img
            src={currentUser?.avatarUrl}
            alt="avatar"
            className="w-12 h-12 rounded-full cursor-pointer"
            onClick={showAccountModal}
          />
          <div className="hidden sm:block">
            <p className="text-lg font-semibold text-slate-200">
              {currentUser?.userName}
            </p>
            <span onClick={showAccountModal} className="cursor-pointer">
              My Account
            </span>
          </div>
        </div>

        <button
          type="button"
          className="p-2 duration-300 rounded-full hover:bg-base-100"
          onClick={showModal}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </>
  );
};

export default CurrentUser;
