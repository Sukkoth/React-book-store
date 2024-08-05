import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SettingsIcon from "@mui/icons-material/Settings";

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
    label: "Settings",
    icon: <SettingsIcon />,
    href: "/settings",
  },
];

// const sidebarItems2 = [
//   {
//     label: "Analytics",
//     // icon: <FaChartLine />,
//     href: "/analytics",
//   },
//   {
//     label: "Messages",
//     // icon: <FaEnvelope />,
//     href: "/messages",
//   },
//   {
//     label: "Library",
//     // icon: <GiBookCover />,
//     href: "/library",
//   },
// ];
