import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NoAuthRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return <Outlet />;

  return <Navigate to="/" />;
};

export default NoAuthRoute;
