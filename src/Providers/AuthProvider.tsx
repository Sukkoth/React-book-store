import { Admin, Owner } from "@/Types/GlobalTypes";
import { createContext, useContext, useState } from "react";

// Define the type for auth context
interface AuthContextType {
  user: Admin | Owner | null;
  userType: "admin" | "owner" | null;
  token: string | null;
  handleSetToken: (userToken: string | null) => void;
  handleSetUser: (user: Admin | Owner, type: "admin" | "owner" | null) => void;
}

// Create a default value for the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the type for the provider props
interface AuthProviderProps {
  children: React.ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Admin | Owner | null>(null);
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

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSetUser,
        handleSetToken,
        token,
        userType,
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
