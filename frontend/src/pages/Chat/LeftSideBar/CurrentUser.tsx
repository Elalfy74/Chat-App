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
      <div className="mb-4 flex flex-col items-center justify-between gap-1 border-b border-b-gray-500 px-3 py-5 sm:flex-row">
        <div className="flex items-center gap-2">
          <img
            src={currentUser?.avatarUrl}
            alt="avatar"
            className="h-10 w-10 cursor-pointer rounded-full object-contain sm:h-12 sm:w-12"
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
          className="rounded-full p-2 duration-300 hover:bg-base-100"
          onClick={showModal}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </>
  );
};

export default CurrentUser;
