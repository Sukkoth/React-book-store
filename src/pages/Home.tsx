import { useAuth } from "@/Providers/AuthProvider";
import { Navigate } from "react-router-dom";

function Home() {
  const { userType } = useAuth();
  return (
    <Navigate to={`/dashboard/${userType === "admin" ? "admin" : "owner"}`} />
  );
}

export default Home;
