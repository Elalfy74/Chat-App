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
  updateUserData: (field: "avatarUrl" | "userName", value: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  handleLogin: (user: CurrentUserType) => {},
  handleLogout: () => {},
  updateUserData: (field, value) => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
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

  const updateUserData = useCallback(
    (field: "avatarUrl" | "userName", value: string) => {
      localStorage.setItem(field, value);

      setCurrentUser((oldCurrentUser) => {
        return (
          oldCurrentUser && {
            ...oldCurrentUser,
            [field]: value,
          }
        );
      });
    },
    []
  );

  const value = {
    currentUser,
    handleLogin,
    handleLogout,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
