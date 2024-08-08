import AdminRoutes from "@/Routes/AdminRoutes";
import AuthRoutes from "@/Routes/AuthRoutes";
import BookOwnerRoutes from "@/Routes/BookOwnerRoutes";
import UIChallengeRoutes from "./UIChallengeRoutes";

const AppRoutes = {
  admin: AdminRoutes,
  auth: AuthRoutes,
  owner: BookOwnerRoutes,
  ui: UIChallengeRoutes,
};

export default AppRoutes;
