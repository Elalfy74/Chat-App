import { useAuth } from "../../../contexts/AuthContext";
import ConverstionList from "./ConverstionList";
import CurrentUser from "./CurrentUser";

const LeftBar = () => {
  const { handleLogout } = useAuth();

  return (
    <div className="border-r sm:w-[300px] border-r-gray-500 border-l border-l-base-300 relative w-fit">
      <CurrentUser />
      <ConverstionList />
      <div className="absolute left-[50%] bottom-4 -translate-x-1/2 w-full flex justify-center pt-3">
        <button className="w-[90%] btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftBar;
