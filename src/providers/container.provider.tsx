/**
 * Container Provider
 *
 * Provides the module container to child components via React context.
 * This enables hooks like useInject to work without requiring the module parameter.
 *
 * @module providers/container
 */

import { useMemo, type ReactNode } from 'react';
import { getModuleContainer, Inversiland } from 'inversiland';
import type { Newable } from 'inversiland';
import { ContainerContext, type ContainerContextValue } from '@/contexts/container.context';

/**
 * Track initialized modules to prevent duplicate initialization
 */
const initializedModules = new WeakSet<Newable>();

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
 * IMPORTANT: This component calls Inversiland.run() to initialize the module.
 * According to Inversiland documentation, run() should only be called once per module.
 *
 * @param props - Provider props
 * @returns Provider component
 *
 * @example
 * ```typescript
 * import { ContainerProvider } from '@pixielity/react-di';
 * import { AppModule } from './app.module';
 *
 * function App() {
 *   return (
 *     <ContainerProvider module={AppModule}>
 *       <MyComponent />
 *     </ContainerProvider>
 *   );
 * }
 * ```
 */
export function ContainerProvider({ module, children }: ContainerProviderProps) {
  // Memoize container initialization to prevent multiple initializations in StrictMode
  const value = useMemo<ContainerContextValue>(() => {
    console.log('[ContainerProvider] Initializing container for module:', module.name);
    console.log('[ContainerProvider] Module already initialized?', initializedModules.has(module));

    // Check if we've already initialized this module
    if (!initializedModules.has(module)) {
      console.log('[ContainerProvider] First initialization - calling Inversiland.run()...');

      try {
        Inversiland.run(module);
        initializedModules.add(module);
        console.log('[ContainerProvider] ✓ Inversiland.run() completed successfully');
      } catch (runError: any) {
        // Check if error is "already running" - this is OK, means another instance initialized it
        if (
          runError?.message?.includes('already running') ||
          runError?.message?.includes('alreadyRunning')
        ) {
          console.log('[ContainerProvider] Module already initialized by another instance');
          initializedModules.add(module);
        } else {
          console.error('[ContainerProvider] ❌ Inversiland.run() failed:', runError);
          throw runError;
        }
      }
    } else {
      console.log('[ContainerProvider] Module already initialized, skipping Inversiland.run()');
    }

    // Get the container (should exist now after Inversiland.run())
    let container;
    try {
      container = getModuleContainer(module);
      console.log('[ContainerProvider] ✓ Container retrieved, ID:', container.innerContainer.id);
    } catch (getError) {
      console.error('[ContainerProvider] ❌ Failed to get container:', getError);
      throw getError;
    }

    console.log('[ContainerProvider] Container ready, ID:', container.innerContainer.id);

    return {
      container,
      moduleClass: module,
    };
  }, [module]);

  console.log('[ContainerProvider] Rendering with value:', {
    containerId: value.container.innerContainer.id,
    moduleClass: value.moduleClass.name,
  });

  return <ContainerContext.Provider value={value}>{children}</ContainerContext.Provider>;
}
