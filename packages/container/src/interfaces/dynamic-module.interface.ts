/**
 * @fileoverview Dynamic module interface — for configurable modules.
 *
 * Dynamic modules are the mechanism for creating configurable, reusable modules.
 * They're returned by static methods like `forRoot()` and `forFeature()`.
 *
 * @module interfaces/dynamic-module
 */

import type { Type } from './type.interface';
import type { ModuleMetadata } from './module-metadata.interface';

/**
 * A module configuration object returned by `forRoot()`, `forFeature()`, etc.
 *
 * Extends `ModuleMetadata` with a `module` property that references the
 * module class, and an optional `global` flag.
 *
 * ## How it works:
 *
 * When the scanner encounters a `DynamicModule` in an imports array, it:
 * 1. Uses the `module` property to identify the module class
 * 2. Merges the dynamic metadata (providers, imports, exports) with
 *    any static metadata from the `@Module()` decorator
 * 3. Registers everything into the container
 *
 * @example
 * ```typescript
 * @Module({})
 * class CacheModule {
 *   static forRoot(config: CacheConfig): DynamicModule {
 *     return {
 *       module: CacheModule,
 *       global: true,
 *       providers: [
 *         { provide: CACHE_CONFIG, useValue: config },
 *         CacheManager,
 *       ],
 *       exports: [CacheManager],
 *     };
 *   }
 * }
 *
 * // Usage:
 * @Module({
 *   imports: [CacheModule.forRoot({ default: 'memory' })],
 * })
 * class AppModule {}
 * ```
 */
export interface DynamicModule extends ModuleMetadata {
  /**
   * The module class this dynamic configuration belongs to.
   * This is how the scanner identifies which module to configure.
   */
  module: Type<any>;

  /**
   * When `true`, this module's exported providers are available globally
   * to all other modules without explicit imports.
   *
   * @default false
   */
  global?: boolean;
}
