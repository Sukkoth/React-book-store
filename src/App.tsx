import { Route, Routes } from "react-router-dom";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import AppRoutes from "@/Routes";
import AuthLayout from "@/Layouts/AuthLayout";
import DashboardLayout from "@/Layouts/DashboardLayout";
import AuthOutlet from "@/Layouts/AuthOutlet";
import CASLOutlet from "@/Layouts/CASLOutlet";
import { useGetCategories } from "@/queries/queries";

function App() {
  useGetCategories();
  return (
    <Routes>
      <Route index element={<AppRoutes.home.index />} />
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='signup' element={<AppRoutes.auth.signup />} />
        <Route path='login'>
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
