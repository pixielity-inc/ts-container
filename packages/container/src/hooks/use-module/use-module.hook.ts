import { useMemo } from "react";
import { getModuleContainer } from "inversiland";
import type { Newable, ModuleContainer } from "inversiland";

/**
 * React hook to access a module container
 *
 * @description
 * Provides access to the ModuleContainer from Inversiland.
 * The module must be initialized with Inversiland.run() before using this hook.
 *
 * @param moduleClass - The module class to get the container from
 * @returns The module container instance
 *
 * @example
 * ```typescript
 * import { useModule } from "@abdokouta/react-di";
 * import { AppModule } from "./app.module";
 *
 * function MyComponent() {
 *   const moduleContainer = useModule(AppModule);
 *
 *   // Access container methods
 *   const service = moduleContainer.get(MyService);
 *   const allServices = moduleContainer.getAll(SERVICE_TOKEN);
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useModule(moduleClass: Newable): ModuleContainer {
  return useMemo(() => {
    return getModuleContainer(moduleClass);
  }, [moduleClass]);
}
