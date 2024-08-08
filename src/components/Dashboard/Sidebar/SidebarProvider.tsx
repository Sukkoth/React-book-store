"use client";
import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

// Define the type for the sidebar context
interface SidebarContextType {
  userType: "admin" | "owner";
  showIconsOnly: boolean;
  toggleShowIconsOnly: () => void;
}

// Create a default value for the context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Define the type for the provider props
interface SidebarProviderProps {
  children: React.ReactNode;
}

// Create the SidebarProvider component
export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const { pathname } = useLocation();

  const [showIconsOnly, setShowIconsOnly] = useState<boolean>(false);
  const [userType] = useState<"admin" | "owner">(
    pathname.includes("/dashboard/owner") ? "owner" : "admin"
  );

  function toggleShowIconsOnly() {
    setShowIconsOnly((prev) => !prev);
  }

  return (
    <SidebarContext.Provider
      value={{ showIconsOnly, toggleShowIconsOnly, userType }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use the Sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
