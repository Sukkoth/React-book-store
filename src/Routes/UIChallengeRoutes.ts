import { lazy } from "react";
import withSuspense from "@/withSuspense";

//*Wrap components with lazy loading
const List = withSuspense(lazy(() => import("@/pages/UI/List")));
const Details = withSuspense(lazy(() => import("@/pages/UI/Details")));

const UIChallengeRoutes = {
  list: List,
  details: Details,
};

export default UIChallengeRoutes;
