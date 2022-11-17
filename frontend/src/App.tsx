import Chat from "./pages/Chat/Chat";
import Sign from "./pages/Sign/Sign";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteLayout from "./pages/RouteLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import { useCallback, useEffect, useState } from "react";
import NoAuthRoute from "./pages/NoAuthRoute";

export type CurrentUserType = {
  token: string;
  userId: string;
  userName: string;
  avatarUrl: string;
};

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");
    const savedUserName = localStorage.getItem("userName");
    const savedAvatarUrl = localStorage.getItem("avatarUrl");

    if (savedToken && savedUserName && savedUserId && savedAvatarUrl) {
      setCurrentUser({
        token: savedToken,
        userId: savedUserId,
        userName: savedUserName,
        avatarUrl: savedAvatarUrl,
      });
    }
  }, []);

  const handleChangeCurrentUser = useCallback(
    (user: CurrentUserType | null) => {
      if (user) {
        localStorage.setItem("token", user?.token);
        localStorage.setItem("userId", user?.userId);
        localStorage.setItem("userName", user?.userName);
        localStorage.setItem("avatarUrl", user?.avatarUrl);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("avatarUrl");
      }

      setCurrentUser(user);
    },
    []
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteLayout />}>
          <Route element={<ProtectedRoute currentUser={currentUser} />}>
            <Route
              index
              element={
                <Chat
                  currentUser={currentUser}
                  handleChangeCurrentUser={handleChangeCurrentUser}
                />
              }
            />
          </Route>
          <Route element={<NoAuthRoute currentUser={currentUser} />}>
            <Route
              path="/login"
              element={
                <Sign handleChangeCurrentUser={handleChangeCurrentUser} />
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
