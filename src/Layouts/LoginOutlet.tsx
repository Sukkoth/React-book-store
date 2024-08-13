import { useAuth } from "@/Providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

function LoginOutlet() {
  const { token, user, userType } = useAuth();

  if (!!token && !!user) {
    return (
      <Navigate to={`/dashboard/${userType === "admin" ? "admin" : "owner"}`} />
    );
  }
  return <Outlet />;
}

export default LoginOutlet;
