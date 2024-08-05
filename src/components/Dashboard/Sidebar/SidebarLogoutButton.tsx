import LogoutIcon from "@mui/icons-material/Logout";
import { useSidebar } from "./SidebarProvider";

function SidebarLogoutButton() {
  const { showIconsOnly } = useSidebar();
  return (
    <div
      className={`
  bg-picton-900 hover:bg-picton-800
 text-white py-2 rounded-md px-4 flex items-center gap-4 cursor-pointer h-12`}
    >
      <LogoutIcon />
      <span className={!showIconsOnly ? "block" : "hidden"}>Logout</span>
    </div>
  );
}

export default SidebarLogoutButton;
