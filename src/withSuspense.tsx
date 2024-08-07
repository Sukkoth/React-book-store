import { ComponentType, Suspense, ReactNode } from "react";
import MainFallback from "./Fallbacks/MainFallback";

export interface withSuspenseProps {
  children?: ReactNode;
}

function withSuspense<P extends withSuspenseProps>(
  LazyComponent: ComponentType<P>,
  componentType: "main" | "explorer" | "app" = "main"
): ComponentType<P> {
  const FallbackComponents: {
    [key: string]: ReactNode;
  } = {
    main: <MainFallback />,
    app: <MainFallback />,
    explorer: <MainFallback />,
  };

  return (props: P) => (
    <Suspense fallback={FallbackComponents[componentType]}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default withSuspense;
