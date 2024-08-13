import { useAuth } from "@/Providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const AuthOutlet = () => {
  const { token } = useAuth();
  if (token !== null) {
    return <Outlet />;
  } else {
    return <Navigate to='/auth/login' replace />;
  }
};

export default AuthOutlet;
