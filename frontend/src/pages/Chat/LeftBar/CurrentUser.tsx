import { AiOutlinePlus } from "react-icons/ai";
import { useAuth } from "../../../contexts/AuthContext";

const CurrentUser = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex items-center justify-between gap-1 px-3 py-5 mb-4 border-b border-b-gray-500">
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
      <button className="p-2 duration-300 rounded-full hover:bg-base-100">
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default CurrentUser;
