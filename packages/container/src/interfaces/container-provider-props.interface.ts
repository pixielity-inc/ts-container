/**
 * @fileoverview Container Provider Props Interface
 *
 * Props for the ContainerProvider component.
 *
 * @module @abdokouta/react-di
 * @category Interfaces
 */
import type { ReactNode } from "react";
import type { Newable } from "inversiland";
import type { IModuleOptions } from "./module-options.interface";

/**
 * Props for ContainerProvider component
 */
export interface ContainerProviderProps {
  /**
   * Root module to initialize
   */
  module: Newable;

  /**
   * Configuration options for the container
   *
   * @example
   * ```typescript
   * <ContainerProvider
   *   module={AppModule}
   *   options={{
   *     logLevel: 'debug',
   *     defaultScope: 'Singleton'
   *   }}
   * >
   *   <App />
   * </ContainerProvider>
   * ```
   */
  options?: IModuleOptions;

  /**
   * Child components
   */
  children: ReactNode;
}
