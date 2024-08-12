import { lazy } from "react";
import withSuspense from "@/withSuspense";

//*Wrap components with lazy loading
const Home = withSuspense(
  lazy(() => import("@/pages/Home")),
  "main"
);

const HomeRoutes = {
  index: Home,
};

export default HomeRoutes;
