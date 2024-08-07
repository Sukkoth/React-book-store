import { lazy } from "react";
import withSuspense from "@/withSuspense";

//*Wrap components with lazy loading
const SignUp = withSuspense(lazy(() => import("@/pages/Auth/Signup")));
const Login = withSuspense(lazy(() => import("@/pages/Auth/Login")));
const LoginAdmin = withSuspense(lazy(() => import("@/pages/Auth/Login/Admin")));
const LoginBookOwner = withSuspense(
  lazy(() => import("@/pages/Auth/Login/BookOwner"))
);

//export all auth routes
const AuthRoutes = {
  signup: SignUp,
  login: {
    index: Login,
    admin: LoginAdmin,
    owner: LoginBookOwner,
  },
};

export default AuthRoutes;
