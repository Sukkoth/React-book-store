import AdminRoutes from "@/Routes/AdminRoutes";
import AuthRoutes from "@/Routes/AuthRoutes";
import BookOwnerRoutes from "@/Routes/BookOwnerRoutes";
import UIChallengeRoutes from "@/Routes/UIChallengeRoutes";
import HomeRoutes from "@/Routes/HomeRoutes";

const AppRoutes = {
  home: HomeRoutes,
  admin: AdminRoutes,
  auth: AuthRoutes,
  owner: BookOwnerRoutes,
  ui: UIChallengeRoutes,
};

export default AppRoutes;
