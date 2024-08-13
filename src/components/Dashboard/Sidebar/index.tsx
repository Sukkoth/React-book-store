import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";

import SidebarGroup from "./SidebarGroup";
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import SidebarLogoutButton from "./SidebarLogoutButton";
import { useSidebar } from "./SidebarProvider";
import { Can } from "@/Providers/AbilityProvider";
import { useAuth } from "@/Providers/AuthProvider";

type LinksType = {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

function Sidebar() {
  const { showIconsOnly } = useSidebar();
  const { handleLogout } = useAuth();

  const adminItems: Array<LinksType[]> = [
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
        label: "Login as Book Owner",
        icon: <AccountCircleIcon />,
        onClick: () => {
          handleLogout("/auth/login/owner");
        },
      },
    ],
  ];

  const ownerItems: Array<LinksType[]> = [
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
        label: "Login as Admin",
        icon: <AccountCircleIcon />,
        onClick: () => {
          handleLogout("/auth/login/admin");
        },
      },
    ],
  ];
  return (
    <div
      className={` bg-midnight-950 text-white rounded-md p-6 ${
        showIconsOnly ? "w-fit" : "w-72"
      } grid grid-rows-[auto_1fr_auto] transition-all duration-300 `}
    >
      <SidebarHeader />
      {/* sidebar content */}
      <Box>
        <Can I='view' a='admin-links'>
          {adminItems.map((menuList, index) => (
            <SidebarGroup key={`menuList-${index}`}>
              {menuList.map((menuItem) => (
                <SidebarItem
                  key={menuItem.label}
                  label={menuItem.label}
                  href={menuItem?.href || undefined}
                  icon={menuItem.icon}
                  onClick={menuItem.onClick}
                />
              ))}
            </SidebarGroup>
          ))}
        </Can>
        <Can I='view' a='owner-links'>
          {ownerItems.map((menuList, index) => (
            <SidebarGroup key={`menuList-${index}`}>
              {menuList.map((menuItem) => (
                <SidebarItem
                  key={menuItem.label}
                  label={menuItem.label}
                  href={menuItem.href}
                  icon={menuItem.icon}
                  onClick={menuItem.onClick}
                />
              ))}
            </SidebarGroup>
          ))}
        </Can>
      </Box>

      <SidebarLogoutButton />
    </div>
  );
}

export default Sidebar;
