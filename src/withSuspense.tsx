import { ComponentType, Suspense, ReactNode } from "react";
import MainFallback from "./Fallbacks/MainFallback";
import DashboardFallback from "@/Fallbacks/DashboardFallback";

export interface withSuspenseProps {
  children?: ReactNode;
}

function withSuspense<P extends withSuspenseProps>(
  LazyComponent: ComponentType<P>,
  componentType: "main" | "dashboard" = "main"
): ComponentType<P> {
  const FallbackComponents: {
    [key: string]: ReactNode;
  } = {
    main: <MainFallback />,
    dashboard: <DashboardFallback />,
  };

  return (props: P) => (
    <Suspense fallback={FallbackComponents[componentType]}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default withSuspense;
