/**
 * @abdokouta/react-di
 *
 * Dependency injection container for React with NestJS-style modules.
 * Built on top of Inversiland for powerful, type-safe dependency injection
 * with decorators, React hooks, and module-based architecture.
 *
 * @example
 * Basic module and service setup:
 * ```typescript
 * import { Module, Injectable, Inject } from '@abdokouta/react-di';
 * import 'reflect-metadata';
 *
 * @Injectable()
 * class LoggerService {
 *   log(message: string) {
 *     console.log(message);
 *   }
 * }
 *
 * @Injectable()
 * class UserService {
 *   constructor(@Inject(LoggerService) private logger: LoggerService) {}
 *
 *   getUser(id: string) {
 *     this.logger.log(`Fetching user ${id}`);
 *     return { id, name: 'John Doe' };
 *   }
 * }
 *
 * @Module({
 *   providers: [LoggerService, UserService],
 * })
 * export class AppModule {}
 * ```
 *
 * @example
 * Using in React components:
 * ```typescript
 * import { ContainerProvider, useInject } from '@abdokouta/react-di';
 * import { AppModule } from './app.module';
 *
 * function App() {
 *   return (
 *     <ContainerProvider module={AppModule}>
 *       <UserComponent />
 *     </ContainerProvider>
 *   );
 * }
 *
 * function UserComponent() {
 *   const userService = useInject(UserService);
 *   const user = userService.getUser('123');
 *   return <div>{user.name}</div>;
 * }
 * ```
 *
 * @example
 * Factory providers:
 * ```typescript
 * @Module({
 *   providers: [
 *     {
 *       provide: ConfigService,
 *       useFactory: () => new ConfigService({ apiUrl: 'https://api.example.com' }),
 *     },
 *   ],
 * })
 * export class AppModule {}
 * ```
 *
 * @module @abdokouta/react-di
 */

import 'reflect-metadata';

// ============================================================================
// Decorators
// ============================================================================
export {
  Module,
  Global,
  Injectable,
  Inject,
  MultiInject,
  Optional,
  InjectProvided,
  InjectImported,
  MultiInjectProvided,
  MultiInjectImported,
} from './decorators';

// ============================================================================
// Types (from Inversiland)
// ============================================================================
export type {
  // Core Types
  Newable,
  NewableModule,
  DynamicModule,
  ModuleContainer,
  ServiceIdentifier,

  // Provider Types (use Provider union type from Inversiland)
  Provider,

  // Module Types
  ModuleMetadataArg,
  ExportedProvider,
  DetailedExportedProvider,

  // Factory Types
  Factory,
  AsyncFactory,
  FactoryWrapper,
  AsyncFactoryWrapper,

  // Custom Types
  Scope,
  LogLevel,
} from './types';

// ============================================================================
// Interfaces (Custom)
// ============================================================================
export type {
  IContainerConfig,
  IModuleOptions,
  IModuleAsyncOptions,
  OnModuleInit,
  OnModuleDestroy,
  ContainerProviderProps,
} from './interfaces';

export { hasOnModuleInit, hasOnModuleDestroy } from './interfaces';

// ============================================================================
// React Hooks
// ============================================================================
export { useInject, useModule, useContainer } from './hooks';

// ============================================================================
// React Providers
// ============================================================================
export { ContainerProvider } from './providers';

// ============================================================================
// Utilities
// ============================================================================
export { createModuleFactory, forRoot, forFeature } from './utils';

// ============================================================================
// Constants
// ============================================================================
export { METADATA_KEYS, DEFAULTS } from './constants';

// ============================================================================
// React Contexts
// ============================================================================
export { ContainerContext } from './contexts';
export type { ContainerContextValue } from './contexts';
