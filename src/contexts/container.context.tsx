/**
 * Container Context
 *
 * Provides React context for the current module container.
 * This allows hooks like useInject to automatically resolve services
 * without requiring the module class parameter.
 *
 * @module contexts/container
 */

import { createContext } from 'react';
import type { Newable, ModuleContainer } from 'inversiland';

/**
 * Container context value
 */
export interface ContainerContextValue {
  /**
   * The module container instance
   */
  container: ModuleContainer;

  /**
   * The module class
   */
  moduleClass: Newable;
}

/**
 * React context for module container
 */
export const ContainerContext = createContext<ContainerContextValue | null>(null);
