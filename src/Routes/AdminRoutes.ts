import { lazy } from "react";
import withSuspense from "@/withSuspense";

//*Wrap components with lazy loading
const Admin_Index = withSuspense(
  lazy(() => import("@/pages/Dashboard/Admin")),
  "dashboard"
);
const Admin_Books = withSuspense(
  lazy(() => import("@/pages/Dashboard/Admin/Books")),
  "dashboard"
);
const Admin_Owners = withSuspense(
  lazy(() => import("@/pages/Dashboard/Admin/BookOwners")),
  "dashboard"
);

//export all admin routes
const AdminRoutes = {
  index: Admin_Index,
  books: Admin_Books,
  owners: Admin_Owners,
};

export default AdminRoutes;
