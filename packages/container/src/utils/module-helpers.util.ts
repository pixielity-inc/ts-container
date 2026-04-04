import type { DynamicModule } from "inversiland";
import type { Newable } from "inversiland";
import type { ModuleMetadataArg } from "../types";
import { applyGlobalIfNeeded, isGlobalModule } from "./global.util";

/**
 * Helper for creating forRoot dynamic modules
 *
 * @description
 * Standard pattern for root-level module configuration.
 * Used for global configuration that should be loaded once.
 *
 * @param moduleClass - The module class
 * @param metadata - Module metadata
 * @returns Dynamic module configuration
 *
 * @example
 * ```typescript
 * import { forRoot } from "@refinedev/core-di";
 *
 * @Module({})
 * export class DatabaseModule {
 *   static forRoot(config: DatabaseConfig): DynamicModule {
 *     return forRoot(DatabaseModule, {
 *       providers: [
 *         {
 *           provide: DATABASE_CONFIG,
 *           useValue: config,
 *         },
 *         DatabaseService,
 *       ],
 *       exports: [DatabaseService],
 *     });
 *   }
 * }
 * ```
 */
export function forRoot(
  moduleClass: Newable,
  metadata: Omit<ModuleMetadataArg, "module">,
): DynamicModule {
  console.log(`[forRoot] Creating dynamic module for: ${moduleClass.name}`);

  const providers = metadata.providers || [];
  const processedProviders = applyGlobalIfNeeded(moduleClass, providers);

  // If module is global, providers are bound globally and don't need to be exported
  const isGlobal = isGlobalModule(moduleClass);
  const exports = isGlobal ? [] : metadata.exports || [];

  if (isGlobal) {
    console.log(
      `[forRoot] Module ${moduleClass.name} is global, removing exports (providers are globally available)`,
    );
  }

  return {
    module: moduleClass,
    ...metadata,
    providers: processedProviders,
    exports,
  };
}

/**
 * Helper for creating forFeature dynamic modules
 *
 * @description
 * Standard pattern for feature-level module configuration.
 * Used for feature-specific configuration that can be loaded multiple times.
 *
 * @param moduleClass - The module class
 * @param metadata - Module metadata
 * @returns Dynamic module configuration
 *
 * @example
 * ```typescript
 * import { forFeature } from "@refinedev/core-di";
 *
 * @Module({})
 * export class RepositoryModule {
 *   static forFeature(entities: Newable[]): DynamicModule {
 *     return forFeature(RepositoryModule, {
 *       providers: entities.map(entity => ({
 *         provide: getRepositoryToken(entity),
 *         useClass: Repository,
 *       })),
 *       exports: entities.map(entity => getRepositoryToken(entity)),
 *     });
 *   }
 * }
 * ```
 */
export function forFeature(
  moduleClass: Newable,
  metadata: Omit<ModuleMetadataArg, "module">,
): DynamicModule {
  console.log(`[forFeature] Creating dynamic module for: ${moduleClass.name}`);

  const providers = metadata.providers || [];
  const processedProviders = applyGlobalIfNeeded(moduleClass, providers);

  // If module is global, providers are bound globally and don't need to be exported
  const isGlobal = isGlobalModule(moduleClass);
  const exports = isGlobal ? [] : metadata.exports || [];

  if (isGlobal) {
    console.log(
      `[forFeature] Module ${moduleClass.name} is global, removing exports (providers are globally available)`,
    );
  }

  return {
    module: moduleClass,
    ...metadata,
    providers: processedProviders,
    exports,
  };
}
