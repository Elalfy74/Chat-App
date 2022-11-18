import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CurrentUserType } from "../utils/global.type";

type AuthContextType = {
  currentUser: CurrentUserType | null;
  handleLogin: (user: CurrentUserType) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  handleLogin: (user: CurrentUserType) => {},
  handleLogout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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

  const handleLogin = useCallback((user: CurrentUserType) => {
    localStorage.setItem("token", user.token);
    localStorage.setItem("userId", user.userId);
    localStorage.setItem("userName", user.userName);
    localStorage.setItem("avatarUrl", user.avatarUrl);

    setCurrentUser(user);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("avatarUrl");

    setCurrentUser(null);
  }, []);

  const value = {
    currentUser,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
