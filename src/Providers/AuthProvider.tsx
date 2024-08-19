import { Admin, Owner } from "@/Types/GlobalTypes";
import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the type for auth context
interface AuthContextType {
  user: Admin | Owner | null;
  userType: "admin" | "owner" | null;
  token: string | null;
  handleSetToken: (userToken: string | null) => void;
  handleSetUser: (user: Admin | Owner, type: "admin" | "owner" | null) => void;
  handleLogout: (redirectTo?: string | null) => void;
}

// Create a default value for the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the type for the provider props
interface AuthProviderProps {
  children: React.ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Admin | Owner | null>(() => {
    const userInLocal = localStorage.getItem("user");
    const parsedUser = userInLocal ? JSON.parse(userInLocal) : null;
    if (parsedUser === null) {
      return null;
    }
    const { userType: localUserType, ...finalData } = parsedUser;
    return finalData;
  });
  const [token, setToken] = useState<string | null>(() => {
    const tokenInLocal = localStorage.getItem("token");
    return tokenInLocal ? tokenInLocal : null;
  });
  const [userType, setUserType] = useState<"admin" | "owner" | null>(() => {
    const userInLocal = localStorage.getItem("user");
    const parsed = userInLocal ? JSON.parse(userInLocal).type : null;

    if (parsed === "admin") {
      return "admin";
    } else if (parsed === "owner") {
      return "owner";
    } else {
      return null;
    }
  });

  function handleSetUser(user: Admin | Owner, type: "admin" | "owner" | null) {
    setUser(user);
    setUserType(type);
    user === null
      ? localStorage.removeItem("user")
      : localStorage.setItem("user", JSON.stringify({ ...user, type }));
  }

  function handleSetToken(userToken: string | null) {
    setToken(userToken);

    userToken === null
      ? localStorage.removeItem("token")
      : localStorage.setItem("token", userToken);
  }

  const handleLogout = useCallback((redirectTo: string | null = null) => {
    setUser(null);
    setToken(null);
    setUserType(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    if (redirectTo) {
      return navigate(redirectTo);
    }
    return navigate("/");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSetUser,
        handleSetToken,
        token,
        userType,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
