import React from "react";
import { useSidebar } from "./SidebarProvider";
import { Link, useLocation } from "react-router-dom";

type Props = {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

function SidebarItem({ label, icon, href, onClick }: Props) {
  const { pathname } = useLocation();
  const { showIconsOnly } = useSidebar();

  if (onClick || !href) {
    return (
      <div
        onClick={onClick}
        className={
          "hover:bg-picton-950  text-white py-2 rounded-md px-4 flex items-center gap-4 cursor-pointer h-12 duration-300 transition-all"
        }
      >
        {icon}
        {!showIconsOnly && <span>{label}</span>}
      </div>
    );
  }
  const testActive = href === pathname;
  return (
    <Link
      to={href!}
      className={`${
        testActive ? "bg-picton-400 hover:bg-picton-500" : "hover:bg-picton-950"
      } text-white py-2 rounded-md px-4 flex items-center gap-4 cursor-pointer h-12 duration-300 transition-all`}
    >
      {icon}
      {!showIconsOnly && <span>{label}</span>}
    </Link>
  );
}

export default SidebarItem;
