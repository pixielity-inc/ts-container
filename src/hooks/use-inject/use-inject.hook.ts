/**
 * useInject Hook
 *
 * React hook to inject a dependency from the module container.
 * Automatically resolves from the current module context.
 *
 * @module hooks/use-inject
 */

import { useMemo } from 'react';
import { getModuleContainer } from 'inversiland';
import type { Newable } from 'inversiland';
import type { ServiceIdentifier } from '../../types';
import { useContainer } from '../use-container';

/**
 * Inject a dependency from the module container
 *
 * @description
 * Retrieves a service from the module container. Can work in two modes:
 *
 * 1. **With ContainerProvider** (Recommended): Automatically resolves from context
 *    ```typescript
 *    const service = useInject(MyService);
 *    ```
 *
 * 2. **Without ContainerProvider**: Requires explicit module parameter
 *    ```typescript
 *    const service = useInject(MyService, AppModule);
 *    ```
 *
 * @param serviceIdentifier - The service identifier (class, symbol, or string)
 * @param moduleClass - Optional module class (uses context if not provided)
 * @returns The resolved service instance
 *
 * @throws Error if used without ContainerProvider and no moduleClass provided
 *
 * @example
 * ```typescript
 * // With ContainerProvider (recommended)
 * import { ContainerProvider, useInject } from "@pixielity/react-di";
 * import { MyService } from "./my.service";
 * import { AppModule } from "./app.module";
 *
 * function App() {
 *   return (
 *     <ContainerProvider module={AppModule}>
 *       <MyComponent />
 *     </ContainerProvider>
 *   );
 * }
 *
 * function MyComponent() {
 *   const myService = useInject(MyService);
 *   return <div>{myService.getData()}</div>;
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Without ContainerProvider (legacy)
 * import { useInject } from "@pixielity/react-di";
 * import { MyService } from "./my.service";
 * import { AppModule } from "./app.module";
 *
 * function MyComponent() {
 *   const myService = useInject(MyService, AppModule);
 *   return <div>{myService.getData()}</div>;
 * }
 * ```
 */
export function useInject<T>(serviceIdentifier: ServiceIdentifier<T>, moduleClass?: Newable): T {
  console.log(
    '[useInject] Called with serviceIdentifier:',
    typeof serviceIdentifier === 'function' ? serviceIdentifier.name : serviceIdentifier
  );

  // Try to get context (will be null if outside ContainerProvider)
  let contextValue: ReturnType<typeof useContainer> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    contextValue = useContainer();
    console.log('[useInject] ✓ Got context from ContainerProvider');
  } catch (error) {
    // Context not available, will use moduleClass parameter
    console.log('[useInject] No context available, will use moduleClass parameter');
  }

  return useMemo(() => {
    console.log('[useInject] useMemo executing...');

    // Use context if available, otherwise use provided moduleClass
    if (contextValue) {
      console.log('[useInject] Using context container');
      console.log('[useInject] Container ID:', contextValue.container.innerContainer.id);
      console.log(
        '[useInject] Attempting to get service:',
        typeof serviceIdentifier === 'function' ? serviceIdentifier.name : serviceIdentifier
      );
      const service = contextValue.container.get(serviceIdentifier);
      console.log(
        '[useInject] ✓ Service resolved:',
        typeof service === 'object' && service !== null ? service.constructor.name : typeof service
      );
      return service;
    }

    if (!moduleClass) {
      console.error('[useInject] ERROR: No context and no moduleClass provided');
      throw new Error(
        'useInject: No module context found and no moduleClass provided. ' +
          'Either wrap your component with <ContainerProvider module={YourModule}> ' +
          'or provide the moduleClass parameter: useInject(Service, Module)'
      );
    }

    console.log('[useInject] Using moduleClass:', moduleClass.name);
    const moduleContainer = getModuleContainer(moduleClass);
    console.log('[useInject] Got module container:', moduleContainer);
    const service = moduleContainer.get(serviceIdentifier);
    console.log('[useInject] ✓ Service resolved:', service);
    return service;
  }, [serviceIdentifier, moduleClass, contextValue]);
}
