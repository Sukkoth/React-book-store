import { Route, Routes } from "react-router-dom";
import AuthLayout from "@/Layouts/AuthLayout";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import AdminLogin from "./pages/Auth/Login/Admin";
import BookOwnerLogin from "./pages/Auth/Login/BookOwner";
import DashboardLayout from "@/Layouts/DashboardLayout";
import AdminDashboard from "@/pages/Dashboard/Admin";
import Books from "@/pages/Dashboard/Admin/Books";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <Routes>
      <Route index element={<h1>Hello World!</h1>} />
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='signup' element={<Signup />} />
        <Route path='login'>
          <Route index element={<Login />} />
          <Route path='admin' element={<AdminLogin />} />
          <Route path='owner' element={<BookOwnerLogin />} />
        </Route>
      </Route>
      <Route path='dashboard' element={<DashboardLayout />}>
        <Route path='admin'>
          <Route index element={<AdminDashboard />} />
          <Route path='books' element={<Books />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
