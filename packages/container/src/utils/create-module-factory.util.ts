import type { DynamicModule } from "inversiland";
import type { Newable } from "inversiland";
import type { ModuleMetadataArg } from "../types";

/**
 * Creates a module factory function
 *
 * @description
 * Helper to create dynamic module factory methods like forRoot, forFeature.
 * Simplifies the creation of configurable modules.
 *
 * @param moduleClass - The module class
 * @param metadata - Module metadata to merge with the module
 * @returns Dynamic module configuration
 *
 * @example
 * ```typescript
 * import { createModuleFactory } from "@refinedev/core-di";
 *
 * @Module({})
 * export class ConfigModule {
 *   static forRoot(config: AppConfig): DynamicModule {
 *     return createModuleFactory(ConfigModule, {
 *       providers: [
 *         {
 *           provide: APP_CONFIG,
 *           useValue: config,
 *         },
 *       ],
 *       exports: [APP_CONFIG],
 *     });
 *   }
 * }
 * ```
 */
export function createModuleFactory(
  moduleClass: Newable,
  metadata: Omit<ModuleMetadataArg, "module">,
): DynamicModule {
  return {
    module: moduleClass,
    ...metadata,
  };
}
