/**
 * @fileoverview Global Module Utilities
 *
 * Provides utility functions for working with global modules and providers
 * in the inversiland DI system.
 *
 * @module @abdokouta/react-di
 * @category Utils
 */

import { METADATA_KEYS } from "@/constants";

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
 * import { Global } from '@abdokouta/react-di';
 * import { isGlobalModule } from '@abdokouta/react-di';
 *
 * @Global()
 * @Module({})
 * class MyModule {}
 *
 * console.log(isGlobalModule(MyModule)); // true
 *
 * @Module({})
 * class RegularModule {}
 *
 * console.log(isGlobalModule(RegularModule)); // false
 * ```
 */
export function isGlobalModule(target: any): boolean {
  try {
    const isGlobal =
      Reflect.getMetadata(METADATA_KEYS.GLOBAL, target.prototype) === true;
    const moduleName = target.name || target.constructor?.name || "Unknown";
    console.log(
      `[isGlobalModule] Checking module: ${moduleName}, isGlobal: ${isGlobal}`,
    );
    return isGlobal;
  } catch (error) {
    console.log(
      `[isGlobalModule] Error checking module, returning false:`,
      error,
    );
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
 * import { makeProvidersGlobal } from '@abdokouta/react-di';
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
  console.log(
    `[makeProvidersGlobal] Making ${providers.length} providers global`,
  );

  return providers.map((provider, index) => {
    // Handle class providers (shorthand)
    if (typeof provider === "function") {
      const result = {
        provide: provider,
        useClass: provider,
        isGlobal: true,
      };
      console.log(
        `[makeProvidersGlobal] Provider ${index}: Class shorthand ${provider.name} -> isGlobal: true`,
      );
      return result;
    }

    // Handle object providers
    if (typeof provider === "object" && provider !== null) {
      const providerName =
        provider.provide?.toString() || provider.provide?.name || "Unknown";
      console.log(
        `[makeProvidersGlobal] Provider ${index}: ${providerName} -> isGlobal: true`,
      );
      return {
        ...provider,
        isGlobal: true,
      };
    }

    console.log(
      `[makeProvidersGlobal] Provider ${index}: Unknown type, returning as-is`,
    );
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
 * import { Global } from '@abdokouta/react-di';
 * import { applyGlobalIfNeeded } from '@abdokouta/react-di';
 *
 * @Global()
 * @Module({})
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
 * @Module({})
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
 * @Module({})
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
 * @Module({})
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
  const moduleName =
    moduleClass.name || moduleClass.constructor?.name || "Unknown";
  console.log(`[applyGlobalIfNeeded] Called for module: ${moduleName}`);

  if (isGlobalModule(moduleClass)) {
    console.log(
      `[applyGlobalIfNeeded] Module ${moduleName} is global, applying to providers`,
    );
    return makeProvidersGlobal(providers);
  }

  console.log(
    `[applyGlobalIfNeeded] Module ${moduleName} is NOT global, returning providers unchanged`,
  );
  return providers;
}
