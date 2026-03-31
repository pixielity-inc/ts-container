/**
 * useContainer Hook
 *
 * Hook to access the current container context.
 *
 * @module hooks/use-container
 */

import { useContext } from 'react';
import { ContainerContext, type ContainerContextValue } from '@/contexts/container.context';

/**
 * Hook to access the current container context
 *
 * @returns Container context value
 * @throws Error if used outside of ContainerProvider
 *
 * @example
 * ```typescript
 * function MyComponent() {
 *   const { container, moduleClass } = useContainer();
 *   const service = container.get(MyService);
 *   return <div>...</div>;
 * }
 * ```
 */
export function useContainer(): ContainerContextValue {
  const context = useContext(ContainerContext);

  if (!context) {
    throw new Error(
      'useContainer must be used within a ContainerProvider. ' +
        'Wrap your component tree with <ContainerProvider module={YourModule}>...</ContainerProvider>'
    );
  }

  return context;
}
