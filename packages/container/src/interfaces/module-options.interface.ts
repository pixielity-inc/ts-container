/**
 * @fileoverview Module Options Interface
 *
 * Defines the standard interface for module configuration options.
 *
 * @module @abdokouta/react-di
 * @category Interfaces
 */
import type { IContainerConfig } from "./container-config.interface";

/**
 * Base module options interface
 *
 * Standard configuration options that all modules should support.
 * Extend this interface in your module-specific options.
 *
 * @example
 * ```typescript
 * import { IModuleOptions } from '@abdokouta/react-di';
 *
 * export interface MyModuleOptions extends IModuleOptions {
 *   customOption: string;
 *   anotherOption?: number;
 * }
 * ```
 */
export interface IModuleOptions extends IContainerConfig {
  /**
   * Whether the module should be global
   *
   * When true, all providers in the module will be marked as global
   * and available across the entire application without explicit imports.
   *
   * @default false
   */
  isGlobal?: boolean;

  /**
   * Modules to import
   *
   * Array of modules that this module depends on.
   */
  imports?: any[];
}
