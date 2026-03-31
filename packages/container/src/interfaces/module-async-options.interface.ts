/**
 * @fileoverview Async Module Options Interface
 *
 * Configuration options for modules that need async initialization.
 *
 * @module @abdokouta/react-di
 * @category Interfaces
 */
import type { IContainerConfig } from "./container-config.interface";

/**
 * Async module options interface
 *
 * Configuration options for modules that need async initialization.
 *
 * @example
 * ```typescript
 * import { IModuleAsyncOptions } from '@abdokouta/react-di';
 *
 * export interface MyModuleAsyncOptions extends IModuleAsyncOptions<MyModuleOptions> {
 *   // Additional async-specific options
 * }
 * ```
 */
export interface IModuleAsyncOptions<T = any> extends IContainerConfig {
  /**
   * Factory function to create module options
   *
   * Can be synchronous or asynchronous.
   */
  useFactory?: (...args: any[]) => Promise<T> | T;

  /**
   * Dependencies to inject into the factory function
   */
  inject?: any[];

  /**
   * Modules to import
   */
  imports?: any[];

  /**
   * Whether the module should be global
   *
   * @default false
   */
  isGlobal?: boolean;
}
