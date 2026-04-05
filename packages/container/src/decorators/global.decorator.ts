/**
 * @fileoverview @Global() decorator.
 *
 * Makes a module's exported providers available globally to all other
 * modules without requiring explicit imports.
 *
 * @module decorators/global
 */

import 'reflect-metadata';
import { GLOBAL_MODULE_METADATA } from '@/constants';

/**
 * Decorator that makes a module global-scoped.
 *
 * Once a global module is imported anywhere (typically in the root module),
 * its exported providers become available to ALL modules in the application
 * without needing to import the module explicitly.
 *
 * Use sparingly — global modules reduce explicitness. Good candidates:
 * - Configuration modules
 * - Logger modules
 * - Database connection modules
 *
 * @example
 * ```typescript
 * @Global()
 * @Module({
 *   providers: [ConfigService],
 *   exports: [ConfigService],
 * })
 * class ConfigModule {
 *   static forRoot(config: AppConfig): DynamicModule {
 *     return {
 *       module: ConfigModule,
 *       global: true, // Can also be set here instead of @Global()
 *       providers: [{ provide: APP_CONFIG, useValue: config }, ConfigService],
 *       exports: [ConfigService],
 *     };
 *   }
 * }
 * ```
 */
export function Global(): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata(GLOBAL_MODULE_METADATA, true, target);
  };
}
