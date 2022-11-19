import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext";

const CurrentUser = ({ showModal }: { showModal: () => void }) => {
  const { currentUser } = useAuth();

  return (
    <div className="flex items-center justify-between gap-1 px-3 py-5 mb-4 border-b border-b-gray-500">
      {/* To Be Deleted*/}
      <Link to="/chat">
        <div className="flex items-center gap-2">
          <img
            src={currentUser?.avatarUrl}
            alt="avatar"
            className="w-12 h-12 rounded-full "
          />
          <div className="hidden sm:block">
            <p className="text-lg font-semibold text-slate-200">
              {currentUser?.userName}
            </p>
            <span>My Account</span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        className="p-2 duration-300 rounded-full hover:bg-base-100"
        onClick={showModal}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default CurrentUser;
