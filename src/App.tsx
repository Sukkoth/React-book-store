import { Route, Routes } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import AuthLayout from "@/Layouts/AuthLayout";
import AuthOutlet from "@/Layouts/AuthOutlet";
import CASLOutlet from "@/Layouts/CASLOutlet";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useGetCategories, useGetUser } from "@/queries/queries";
import AppRoutes from "@/Routes";
import { useEffect } from "react";
import { PuffLoader } from "react-spinners";
import LoginOutlet from "./Layouts/LoginOutlet";
import { useAuth } from "./Providers/AuthProvider";

function App() {
  useGetCategories();
  const { handleLogout } = useAuth();
  const { isLoading, error } = useGetUser();

  useEffect(() => {
    if (error?.response?.status) {
      handleLogout();
    }
  }, [error?.response?.status]);

  return isLoading ? (
    <div className='h-[100dvh] w-full flex flex-col items-center justify-center'>
      <PuffLoader color='#38459b' size={100} />
      <h1 className='font-medium uppercase text-xl py-6 animate-pulse text-midnight-950'>
        Loading
      </h1>
    </div>
  ) : (
    <Routes>
      <Route index element={<AppRoutes.home.index />} />
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='signup' element={<AppRoutes.auth.signup />} />
        <Route path='login' element={<LoginOutlet />}>
          <Route index element={<AppRoutes.auth.login.index />} />
          <Route path='admin' element={<AppRoutes.auth.login.admin />} />
          <Route path='owner' element={<AppRoutes.auth.login.owner />} />
        </Route>
      </Route>
      <Route path='dashboard' element={<DashboardLayout />}>
        <Route element={<AuthOutlet />}>
          <Route path='admin' element={<CASLOutlet type='admin' />}>
            <Route index element={<AppRoutes.admin.index />} />
            <Route path='books' element={<AppRoutes.admin.books />} />
            <Route path='owners' element={<AppRoutes.admin.owners />} />
          </Route>
          <Route path='owner' element={<CASLOutlet type='owner' />}>
            <Route index element={<AppRoutes.owner.index />} />
            <Route path='books' element={<AppRoutes.owner.books />} />
          </Route>
        </Route>
      </Route>
      <Route path='ui'>
        <Route path='list' element={<AppRoutes.ui.list />} />
        <Route path='details' element={<AppRoutes.ui.details />} />
      </Route>
    </Routes>
  );
}

export default App;
