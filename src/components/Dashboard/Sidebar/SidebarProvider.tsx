"use client";
import { createContext, useContext, useState } from "react";

// Define the type for the sidebar context
interface SidebarContextType {
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
  const [showIconsOnly, setShowIconsOnly] = useState<boolean>(false);

  function toggleShowIconsOnly() {
    setShowIconsOnly((prev) => !prev);
  }

  return (
    <SidebarContext.Provider value={{ showIconsOnly, toggleShowIconsOnly }}>
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
