import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mt-10 text-center">
      <h1 className="mb-5 text-4xl">404 Page Not Found</h1>
      <Link to="/chat" className="btn">
        Return To Home
      </Link>
    </div>
  );
};

export default NotFound;
