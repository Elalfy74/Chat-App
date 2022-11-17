import { Navigate, Outlet } from "react-router-dom";
import { CurrentUserType } from "../App";

const ProtectedRoute = ({
  currentUser,
}: {
  currentUser: CurrentUserType | null;
}) => {
  if (currentUser) return <Outlet />;

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
