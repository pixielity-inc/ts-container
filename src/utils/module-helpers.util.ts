import type { DynamicModule } from 'inversiland';
import type { Newable } from 'inversiland';
import type { ModuleMetadataArg } from '../types';

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
 * @module({})
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
  metadata: Omit<ModuleMetadataArg, 'module'>
): DynamicModule {
  return {
    module: moduleClass,
    ...metadata,
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
 * @module({})
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
  metadata: Omit<ModuleMetadataArg, 'module'>
): DynamicModule {
  return {
    module: moduleClass,
    ...metadata,
  };
}
