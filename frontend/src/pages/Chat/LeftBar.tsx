import { CurrentUserType } from "../../App";

const LeftBar = ({
  currentUser,
  handleChangeCurrentUser,
}: {
  currentUser: CurrentUserType | null;
  handleChangeCurrentUser: (user: CurrentUserType | null) => void;
}) => {
  return (
    <div className="border-r w-[250px] px-3 py-4 border-r-gray-500 flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <img
          src={currentUser?.avatarUrl}
          alt="avatar"
          className="w-10 h-10 rounded-full "
        />
        <div>
          <p className="text-lg font-semibold text-slate-200">
            {currentUser?.userName}
          </p>
          <span>My Account</span>
        </div>
      </div>
      <button className="btn" onClick={() => handleChangeCurrentUser(null)}>
        Logout
      </button>
    </div>
  );
};

export default LeftBar;
