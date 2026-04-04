/**
 * @fileoverview Global Decorator
 *
 * Provides a decorator to mark modules as global in the inversiland DI system.
 * This decorator simplifies the syntax for creating global modules by automatically
 * marking all providers as global.
 *
 * @module @abdokouta/react-di
 * @category Decorators
 */

import "reflect-metadata";
import { METADATA_KEYS } from "@/constants";
import { makeProvidersGlobal } from "@/utils/global.util";

/**
 * Global Module Decorator
 *
 * Marks a module as global, making all its providers available across the entire application
 * without explicit imports. This is useful for utility services, configuration, and shared resources.
 *
 * When applied to a module class, this decorator:
 * 1. Marks the module with global metadata
 * 2. Moves all providers to globalProviders (by adding isGlobal: true)
 * 3. Clears exports since global providers don't need to be exported
 *
 * Note: Due to TypeScript decorator execution order (bottom-to-top), @Global() runs
 * AFTER @Module, so it can read and modify the metadata already set by @Module.
 *
 * @decorator
 * @returns Class decorator function
 *
 * @example Basic usage
 * ```typescript
 * import { Global, Module } from '@abdokouta/react-di';
 *
 * @Global()
 * @Module({
 *   providers: [ConfigService],
 *   exports: [ConfigService],
 * })
 * export class ConfigModule {}
 * // ConfigService is now available globally without explicit imports
 * ```
 *
 * @example With dynamic module
 * ```typescript
 * import { Global, applyGlobalIfNeeded } from '@abdokouta/react-di';
 *
 * @Global()
 * @Module({})
 * export class LoggerModule {
 *   static forRoot(options: LoggerOptions) {
 *     const providers = [
 *       { provide: LoggerService, useClass: LoggerService },
 *       { provide: 'LOGGER_OPTIONS', useValue: options },
 *     ];
 *
 *     return {
 *       module: LoggerModule,
 *       // Automatically applies isGlobal: true to all providers
 *       providers: applyGlobalIfNeeded(LoggerModule, providers),
 *       exports: [LoggerService],
 *     };
 *   }
 * }
 * ```
 */
export function Global(): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const R = Reflect as any;
  return function (target: Function): void {
    R.defineMetadata(METADATA_KEYS.GLOBAL, true, target.prototype);

    const existingProviders: any[] =
      R.getMetadata("providers", target.prototype) || [];
    const existingGlobalProviders: any[] =
      R.getMetadata("globalProviders", target.prototype) || [];

    if (existingProviders.length > 0) {
      const newGlobalProviders = makeProvidersGlobal(existingProviders);

      R.defineMetadata("providers", [], target.prototype);
      R.defineMetadata(
        "globalProviders",
        [...existingGlobalProviders, ...newGlobalProviders],
        target.prototype,
      );

      R.defineMetadata("exports", [], target.prototype);

      console.log(
        `[@Global] Moved ${existingProviders.length} providers to globalProviders for module: ${(target as any).name}`,
      );
    } else {
      console.log(
        `[@Global] No providers to move for module: ${(target as any).name} (providers may be added via forRoot)`,
      );
    }
  };
}
