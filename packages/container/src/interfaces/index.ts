/**
 * @fileoverview All interfaces and types for the DI container.
 *
 * @module interfaces
 */

export type { Type } from './type.interface';
export type { InjectionToken } from './injection-token.interface';
export type {
  Provider,
  ClassProvider,
  ValueProvider,
  FactoryProvider,
  ExistingProvider,
} from './provider.interface';
export type { ModuleMetadata } from './module-metadata.interface';
export type { DynamicModule } from './dynamic-module.interface';
export type { ForwardReference } from './forward-reference.interface';
export type { OnModuleInit, OnModuleDestroy } from './lifecycle.interface';
export type { ContainerResolver } from './container-resolver.interface';
export type { ScopeOptions } from './scope-options.interface';
export { Scope } from './scope.enum';
