import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  if (currentUser) return <Outlet />;

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
