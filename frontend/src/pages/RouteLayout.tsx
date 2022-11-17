import { Outlet } from "react-router-dom";

const RouteLayout = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <Outlet />
    </div>
  );
};

export default RouteLayout;
