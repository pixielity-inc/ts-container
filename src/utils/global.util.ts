/**
 * @fileoverview Global Module Utilities
 *
 * Provides utility functions for working with global modules and providers
 * in the inversiland DI system.
 *
 * @module @pixielity/react-di
 * @category Utils
 */

import { METADATA_KEYS } from '@/constants';

/**
 * Check if a module is marked as global
 *
 * Utility function to check if a module class has been decorated with @Global().
 * This is used internally by module registration logic to determine if providers
 * should be automatically marked as global.
 *
 * @param target - The module class to check
 * @returns True if the module is marked as global
 *
 * @example
 * ```typescript
 * import { Global } from '@pixielity/react-di';
 * import { isGlobalModule } from '@pixielity/react-di';
 *
 * @Global()
 * @module({})
 * class MyModule {}
 *
 * console.log(isGlobalModule(MyModule)); // true
 *
 * @module({})
 * class RegularModule {}
 *
 * console.log(isGlobalModule(RegularModule)); // false
 * ```
 */
export function isGlobalModule(target: any): boolean {
  try {
    return Reflect.getMetadata(METADATA_KEYS.GLOBAL, target.prototype) === true;
  } catch {
    return false;
  }
}

/**
 * Make providers global
 *
 * Helper function that takes an array of providers and marks them all as global.
 * This is useful when you want to programmatically make providers global without
 * using the @Global() decorator.
 *
 * @param providers - Array of providers to mark as global
 * @returns Array of providers with isGlobal: true
 *
 * @example Basic usage
 * ```typescript
 * import { makeProvidersGlobal } from '@pixielity/react-di';
 *
 * const providers = [
 *   { provide: ServiceA, useClass: ServiceA },
 *   { provide: ServiceB, useClass: ServiceB },
 * ];
 *
 * const globalProviders = makeProvidersGlobal(providers);
 * // All providers now have isGlobal: true
 * ```
 *
 * @example In module forRoot()
 * ```typescript
 * static forRoot(options: ModuleOptions) {
 *   const providers = [
 *     { provide: MyService, useClass: MyService },
 *     { provide: 'OPTIONS', useValue: options },
 *   ];
 *
 *   return {
 *     module: MyModule,
 *     providers: options.isGlobal
 *       ? makeProvidersGlobal(providers)
 *       : providers,
 *   };
 * }
 * ```
 *
 * @example With class shorthand
 * ```typescript
 * const providers = [
 *   ServiceA,  // Class shorthand
 *   ServiceB,
 * ];
 *
 * const globalProviders = makeProvidersGlobal(providers);
 * // Converted to: [
 * //   { provide: ServiceA, useClass: ServiceA, isGlobal: true },
 * //   { provide: ServiceB, useClass: ServiceB, isGlobal: true },
 * // ]
 * ```
 *
 * @example Preserving existing properties
 * ```typescript
 * const providers = [
 *   {
 *     provide: 'ServiceA',
 *     useFactory: () => new ServiceA(),
 *     inject: ['Dependency'],
 *   },
 * ];
 *
 * const globalProviders = makeProvidersGlobal(providers);
 * // Result: [
 * //   {
 * //     provide: 'ServiceA',
 * //     useFactory: [Function],
 * //     inject: ['Dependency'],
 * //     isGlobal: true,  // Added
 * //   }
 * // ]
 * ```
 */
export function makeProvidersGlobal(providers: any[]): any[] {
  return providers.map((provider) => {
    // Handle class providers (shorthand)
    if (typeof provider === 'function') {
      return {
        provide: provider,
        useClass: provider,
        isGlobal: true,
      };
    }

    // Handle object providers
    if (typeof provider === 'object' && provider !== null) {
      return {
        ...provider,
        isGlobal: true,
      };
    }

    return provider;
  });
}

/**
 * Apply global to providers if module is global
 *
 * Convenience function that checks if a module is marked as @Global() and
 * automatically applies isGlobal: true to all providers if it is.
 *
 * This is the recommended approach for implementing global modules as it
 * keeps the module definition clean and centralizes the global logic.
 *
 * @param moduleClass - The module class to check
 * @param providers - Array of providers
 * @returns Array of providers, marked as global if module is global
 *
 * @example Standard usage in forRoot()
 * ```typescript
 * import { Global } from '@pixielity/react-di';
 * import { applyGlobalIfNeeded } from '@pixielity/react-di';
 *
 * @Global()
 * @module({})
 * export class MyModule {
 *   static forRoot(options: ModuleOptions) {
 *     const providers = [
 *       { provide: MyService, useClass: MyService },
 *       { provide: 'OPTIONS', useValue: options },
 *     ];
 *
 *     return {
 *       module: MyModule,
 *       // Automatically applies isGlobal if @Global() is present
 *       providers: applyGlobalIfNeeded(MyModule, providers),
 *     };
 *   }
 * }
 * ```
 *
 * @example With forRootAsync()
 * ```typescript
 * @Global()
 * @module({})
 * export class ConfigModule {
 *   static forRootAsync(options: ConfigAsyncOptions) {
 *     const providers = [
 *       {
 *         provide: ConfigService,
 *         useFactory: options.useFactory,
 *         inject: options.inject || [],
 *       },
 *     ];
 *
 *     return {
 *       module: ConfigModule,
 *       imports: options.imports || [],
 *       providers: applyGlobalIfNeeded(ConfigModule, providers),
 *       exports: [ConfigService],
 *     };
 *   }
 * }
 * ```
 *
 * @example Without @Global() decorator
 * ```typescript
 * @module({})
 * export class RegularModule {
 *   static forRoot(options: ModuleOptions) {
 *     const providers = [
 *       { provide: MyService, useClass: MyService },
 *     ];
 *
 *     return {
 *       module: RegularModule,
 *       // No change - providers remain non-global
 *       providers: applyGlobalIfNeeded(RegularModule, providers),
 *     };
 *   }
 * }
 * ```
 *
 * @example Combining with conditional logic
 * ```typescript
 * @Global()
 * @module({})
 * export class CacheModule {
 *   static forRoot(options: CacheOptions) {
 *     const providers = [
 *       { provide: CacheService, useClass: CacheService },
 *     ];
 *
 *     // If options.isGlobal is explicitly false, don't make global
 *     // Otherwise, respect the @Global() decorator
 *     if (options.isGlobal === false) {
 *       return {
 *         module: CacheModule,
 *         providers,
 *       };
 *     }
 *
 *     return {
 *       module: CacheModule,
 *       providers: applyGlobalIfNeeded(CacheModule, providers),
 *     };
 *   }
 * }
 * ```
 */
export function applyGlobalIfNeeded(moduleClass: any, providers: any[]): any[] {
  if (isGlobalModule(moduleClass)) {
    return makeProvidersGlobal(providers);
  }
  return providers;
}
