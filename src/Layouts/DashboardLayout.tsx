import {
  SidebarProvider,
  // useSidebar,
} from "@/components/Dashboard/Sidebar/SidebarProvider";
import Sidebar from "@/components/Dashboard/Sidebar";
import Breadcrumb from "@/components/Dashboard/Breadcrumb";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  // const { showIconsOnly } = useSidebar();
  return (
    <div
      className={`bg-dashboard-bg lg:h-[100dvh] p-4 grid ${"grid-cols-[auto_1fr]"} gap-4 relative`}
    >
      <Sidebar />
      <div className='lg:w-full overflow-scroll h-[95dvh] grid grid-rows-[auto_1fr]'>
        <Breadcrumb />
        <div className='pt-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function Wrapped() {
  return (
    <SidebarProvider>
      <DashboardLayout />
    </SidebarProvider>
  );
}

export default Wrapped;
