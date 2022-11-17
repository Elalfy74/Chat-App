import { Navigate, Outlet } from "react-router-dom";
import { CurrentUserType } from "../App";

const NoAuthRoute = ({
  currentUser,
}: {
  currentUser: CurrentUserType | null;
}) => {
  if (!currentUser) return <Outlet />;

  return <Navigate to="/" />;
};

export default NoAuthRoute;
