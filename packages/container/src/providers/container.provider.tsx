/**
 * Container Provider
 *
 * Provides the module container to child components via React context.
 * This enables hooks like useInject to work without requiring the module parameter.
 *
 * IMPORTANT: Inversiland.run() should be called BEFORE React renders,
 * typically in your main.tsx/index.tsx entry point. This provider only
 * provides the container context to child components.
 *
 * @module providers/container
 */

import type { Newable } from "inversiland";
import { useMemo, type ReactNode } from "react";
import { getModuleContainer } from "inversiland";

import {
  ContainerContext,
  type ContainerContextValue,
} from "@/contexts/container.context";
import { Container } from "@/container";

/**
 * Container Provider Props
 */
export interface ContainerProviderProps {
  /**
   * The module class to provide
   */
  module: Newable;

  /**
   * Child components
   */
  children: ReactNode;
}

/**
 * Container Provider Component
 *
 * Provides the module container to child components via React context.
 * This enables hooks like useInject to work without requiring the module parameter.
 *
 * IMPORTANT: Call Inversiland.run(module) in your entry point (main.tsx)
 * BEFORE React renders. This provider only retrieves the already-initialized container.
 *
 * @param props - Provider props
 * @returns Provider component
 *
 * @example
 * ```typescript
 * // main.tsx - Initialize BEFORE React
 * import { Inversiland } from 'inversiland';
 * import { AppModule } from './app.module';
 *
 * Inversiland.run(AppModule);
 *
 * ReactDOM.createRoot(document.getElementById('root')!).render(
 *   <ContainerProvider module={AppModule}>
 *     <App />
 *   </ContainerProvider>
 * );
 * ```
 */
export function ContainerProvider({ children }: ContainerProviderProps) {
  const module = Container.getModule();

  if (!module) {
    throw new Error(
      "[ContainerProvider] No module found. Call Container.configure().withModule(YourModule).build() before rendering.",
    );
  }

  const value = useMemo<ContainerContextValue>(() => {
    const container = getModuleContainer(module);
    return {
      container,
      moduleClass: module,
    };
  }, [module]);

  return (
    <ContainerContext.Provider value={value}>
      {children}
    </ContainerContext.Provider>
  );
}
