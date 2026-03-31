import { module } from 'inversiland';

import type { ModuleMetadataArg } from '@/types';

/**
 * Module Decorator
 *
 * @description
 * Defines a module in the dependency injection system.
 * A module is a class that organizes related providers and their dependencies.
 *
 * @param metadata - Module configuration
 * @param metadata.imports - Modules to import
 * @param metadata.providers - Services to provide
 * @param metadata.exports - Services to export to other modules
 *
 * @example
 * ```typescript
 * import { Module } from "@abdokouta/react-di";
 *
 * @Module({
 *   imports: [CommonModule],
 *   providers: [UserService, Logger],
 *   exports: [UserService]
 * })
 * export class UserModule {}
 * ```
 *
 * @public
 */
export const Module = (metadata: ModuleMetadataArg = {}): ClassDecorator => {
  return module(metadata) as ClassDecorator;
};
