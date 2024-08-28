import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { createContextualCan } from "@casl/react";
import { AppAbility } from "@/utils/permissions";
import { useAuth } from "./AuthProvider";
import { createAbility } from "@/utils/permissions";
import { RawRuleOf } from "@casl/ability";

const AbilityContext = createContext<AppAbility | undefined>(undefined);

export const AbilityProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { userType, user } = useAuth();
  const ability = useMemo(
    () => createAbility(user?.role.permissions as RawRuleOf<AppAbility>[]),
    [userType]
  );

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
