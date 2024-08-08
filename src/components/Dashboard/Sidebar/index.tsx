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
  const { showIconsOnly, userType } = useSidebar();
  return (
    <div
      className={` bg-midnight-950 text-white rounded-md p-6 ${
        showIconsOnly ? "w-fit" : "w-72"
      } grid grid-rows-[auto_1fr_auto] transition-all duration-300 `}
    >
      <SidebarHeader />
      {/* sidebar content */}

      <Box>
        {[...(userType === "admin" ? adminItems : ownerItems)].map(
          (menuList, index) => (
            <SidebarGroup key={`menuList-${index}`}>
              {menuList.map((menuItem) => (
                <SidebarItem
                  key={menuItem.label}
                  label={menuItem.label}
                  href={menuItem.href}
                  icon={menuItem.icon}
                />
              ))}
            </SidebarGroup>
          )
        )}
      </Box>

      <SidebarLogoutButton />
    </div>
  );
}

export default Sidebar;

const adminItems = [
  [
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
  ],
  [
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
  ],
];

const ownerItems = [
  [
    {
      label: "Dashboard",
      icon: <SpaceDashboardIcon />,
      href: "/dashboard/owner",
    },
    {
      label: "Books",
      icon: <LibraryBooksIcon />,
      href: "/dashboard/owner/books",
    },
  ],
  [
    {
      label: "Notifications",
      icon: <NotificationsIcon />,
      href: "/dashboard/owner/notifications",
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
      href: "/dashboard/owner/settings",
    },
    {
      label: "Login as Admin",
      icon: <AccountCircleIcon />,
      href: "/auth/login/admin",
    },
  ],
];
