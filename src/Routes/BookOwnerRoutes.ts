import { lazy } from "react";
import withSuspense from "@/withSuspense";

//*Wrap components with lazy loading
const Owner_Index = withSuspense(
  lazy(() => import("@/pages/Dashboard/BookOwner")),
  "dashboard"
);
const Owner_Books = withSuspense(
  lazy(() => import("@/pages/Dashboard/BookOwner/Books")),
  "dashboard"
);

//export all book owner routes
const BookOwnerRoutes = {
  index: Owner_Index,
  books: Owner_Books,
};

export default BookOwnerRoutes;
