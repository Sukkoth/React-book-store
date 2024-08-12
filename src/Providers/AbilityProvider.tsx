import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { createContextualCan } from "@casl/react";
import defineAbility, { AppAbility } from "@/utils/ability";
import { useAuth } from "./AuthProvider";

// Create a default instance for AppAbility as a fallback
// const defaultAbility = defineAbility("guest"); // Or any other default role

// Create a context for AppAbility
const AbilityContext = createContext<AppAbility | undefined>(undefined);

// AbilityProvider will pass the AppAbility instance directly
export const AbilityProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { userType } = useAuth();
  const ability = useMemo(() => defineAbility(userType || "guest"), [userType]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

// Custom hook to use the ability
export const useAbility = () => {
  const ability = useContext(AbilityContext);
  if (!ability) {
    throw new Error("useAbility must be used within an AbilityProvider");
  }
  return ability;
};

// Create a Can component bound to the AbilityContext
export const Can = createContextualCan(
  AbilityContext.Consumer as React.Consumer<AppAbility>
);
