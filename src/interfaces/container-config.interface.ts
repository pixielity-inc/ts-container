/**
 * @fileoverview Container Configuration Interface
 *
 * Base configuration options for the DI container.
 *
 * @module @abdokouta/react-di
 * @category Interfaces
 */
import type { Scope } from '../types/scope.type';
import type { LogLevel } from '../types/log-level.type';

/**
 * Container configuration interface
 *
 * Base configuration options that control the behavior of the DI container.
 *
 * @example
 * ```typescript
 * import { IContainerConfig } from '@abdokouta/react-di';
 *
 * const config: IContainerConfig = {
 *   logLevel: 'debug',
 *   defaultScope: 'Singleton'
 * };
 * ```
 */
export interface IContainerConfig {
  /**
   * Log level for debugging
   * @default "info"
   */
  logLevel?: LogLevel;

  /**
   * Default scope for providers
   * @default "Singleton"
   */
  defaultScope?: Scope;
}
