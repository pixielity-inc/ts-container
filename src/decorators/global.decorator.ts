/**
 * @fileoverview Global Decorator
 *
 * Provides a decorator to mark modules as global in the inversiland DI system.
 * This decorator simplifies the syntax for creating global modules by automatically
 * marking all providers as global.
 *
 * @module @pixielity/react-di
 * @category Decorators
 */

import { METADATA_KEYS } from '@/constants';

/**
 * Global Module Decorator
 *
 * Marks a module as global, making all its providers available across the entire application
 * without explicit imports. This is useful for utility services, configuration, and shared resources.
 *
 * When applied to a module class, this decorator:
 * 1. Marks the module with global metadata
 * 2. Works with `applyGlobalIfNeeded()` to automatically set `isGlobal: true` on all providers
 *
 * @decorator
 * @returns Class decorator function
 *
 * @example Basic usage
 * ```typescript
 * import { Global, applyGlobalIfNeeded } from '@pixielity/react-di';
 * import { module } from 'inversiland';
 *
 * @Global()
 * @module({
 *   providers: [ConfigService],
 *   exports: [ConfigService],
 * })
 * export class ConfigModule {
 *   static forRoot(options: ConfigOptions) {
 *     const providers = [
 *       {
 *         provide: ConfigService,
 *         useFactory: () => new ConfigService(options),
 *       }
 *     ];
 *
 *     return {
 *       module: ConfigModule,
 *       providers: applyGlobalIfNeeded(ConfigModule, providers),
 *     };
 *   }
 * }
 * ```
 *
 * @example With dynamic module
 * ```typescript
 * import { Global, applyGlobalIfNeeded } from '@pixielity/react-di';
 *
 * @Global()
 * @module({})
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
 *
 * @example Without @Global() - manual approach
 * ```typescript
 * import { makeProvidersGlobal } from '@pixielity/react-di';
 *
 * @module({})
 * export class CacheModule {
 *   static forRoot(options: CacheOptions) {
 *     const providers = [
 *       { provide: CacheService, useClass: CacheService },
 *       { provide: 'CACHE_OPTIONS', useValue: options },
 *     ];
 *
 *     return {
 *       module: CacheModule,
 *       // Conditionally make providers global based on options
 *       providers: options.isGlobal
 *         ? makeProvidersGlobal(providers)
 *         : providers,
 *     };
 *   }
 * }
 * ```
 */
export function Global(): ClassDecorator {
  return function <T extends Function>(target: T): T {
    // Mark the module as global using metadata
    Reflect.defineMetadata(METADATA_KEYS.GLOBAL, true, target.prototype);

    return target;
  };
}
