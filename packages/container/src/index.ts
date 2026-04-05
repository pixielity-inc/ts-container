/**
 * @abdokouta/ts-container
 *
 * NestJS-style dependency injection for React and client-side applications.
 * Built from scratch — no Inversify, no heavy runtime.
 *
 * This is the main entry point. It exports:
 * - Decorators (@Injectable, @Inject, @Module, @Optional, @Global)
 * - The DI engine (Container, Injector, Scanner, Module, InstanceWrapper)
 * - Interfaces and types
 * - Utilities (forwardRef)
 *
 * For React bindings, import from `@abdokouta/ts-container/react`.
 *
 * @example
 * ```typescript
 * import 'reflect-metadata';
 * import { Injectable, Inject, Module } from '@abdokouta/ts-container';
 *
 * @Injectable()
 * class UserService {
 *   constructor(private logger: LoggerService) {}
 * }
 *
 * @Module({
 *   providers: [LoggerService, UserService],
 *   exports: [UserService],
 * })
 * class UserModule {}
 * ```
 *
 * @module @abdokouta/ts-container
 */

import 'reflect-metadata';

// ─────────────────────────────────────────────────────────────────────────────
// Decorators
// ─────────────────────────────────────────────────────────────────────────────
export { Injectable } from './decorators/injectable.decorator';
export { Inject } from './decorators/inject.decorator';
export { Optional } from './decorators/optional.decorator';
export { Module } from './decorators/module.decorator';
export { Global } from './decorators/global.decorator';

// ─────────────────────────────────────────────────────────────────────────────
// Interfaces & Types
// ─────────────────────────────────────────────────────────────────────────────
export type { Type } from './interfaces/type.interface';
export type { InjectionToken } from './interfaces/injection-token.interface';
export type {
  Provider,
  ClassProvider,
  ValueProvider,
  FactoryProvider,
  ExistingProvider,
} from './interfaces/provider.interface';
export type { ModuleMetadata } from './interfaces/module-metadata.interface';
export type { DynamicModule } from './interfaces/dynamic-module.interface';
export type { ForwardReference } from './interfaces/forward-reference.interface';
export type { OnModuleInit, OnModuleDestroy } from './interfaces/lifecycle.interface';
export type { ContainerResolver } from './interfaces/container-resolver.interface';
export type { ScopeOptions } from './interfaces/scope-options.interface';
export { Scope } from './interfaces/scope.enum';

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────
export { forwardRef } from './utils/forward-ref.util';

// ─────────────────────────────────────────────────────────────────────────────
// DI Engine (Container, Injector, Scanner, Module, etc.)
// ─────────────────────────────────────────────────────────────────────────────
export { NestContainer } from './injector/container';
export { Module as ModuleRef } from './injector/module';
export { Injector } from './injector/injector';
export { InstanceWrapper } from './injector/instance-wrapper';
export { InstanceLoader } from './injector/instance-loader';
export { DependenciesScanner } from './injector/scanner';

// ─────────────────────────────────────────────────────────────────────────────
// Constants (for library authors building on top of this)
// ─────────────────────────────────────────────────────────────────────────────
export {
  MODULE_METADATA,
  GLOBAL_MODULE_METADATA,
  INJECTABLE_WATERMARK,
  SCOPE_OPTIONS_METADATA,
  PARAMTYPES_METADATA,
  SELF_DECLARED_DEPS_METADATA,
  OPTIONAL_DEPS_METADATA,
  PROPERTY_DEPS_METADATA,
  OPTIONAL_PROPERTY_DEPS_METADATA,
} from './constants/tokens.constant';
