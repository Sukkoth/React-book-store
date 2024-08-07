import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";

import SidebarGroup from "./SidebarGroup";
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import SidebarLogoutButton from "./SidebarLogoutButton";
import { useSidebar } from "./SidebarProvider";

function Sidebar() {
  const { showIconsOnly } = useSidebar();
  return (
    <div
      className={` bg-midnight-950 text-white rounded-md p-6 ${
        showIconsOnly ? "w-fit" : "w-72"
      } grid grid-rows-[auto_1fr_auto] transition-all duration-300 `}
    >
      <SidebarHeader />
      {/* sidebar content */}

      <Box>
        <SidebarGroup>
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon}
            />
          ))}
        </SidebarGroup>

        <SidebarGroup>
          {sidebarItems2.map((item) => (
            <SidebarItem
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon}
            />
          ))}
        </SidebarGroup>
      </Box>

      {/* sidebar footer */}

      <SidebarLogoutButton />
    </div>
  );
}

export default Sidebar;

//vary this data based on pathname
const sidebarItems = [
  {
    label: "Dashboard",
    icon: <SpaceDashboardIcon />,
    href: "/dashboard/admin",
  },
  {
    label: "Books",
    icon: <LibraryBooksIcon />,
    href: "/dashboard/admin/books",
  },
  {
    label: "Owners",
    icon: <PersonIcon />,
    href: "/dashboard/admin/owners",
  },
];

const sidebarItems2 = [
  {
    label: "Notifications",
    icon: <NotificationsIcon />,
    href: "/dashboard/admin/notifications",
  },
  {
    label: "Settings",
    icon: <SettingsIcon />,
    href: "/dashboard/admin/settings",
  },
  {
    label: "Login as Book Owner",
    icon: <AccountCircleIcon />,
    href: "/auth/login/owner",
  },
];
