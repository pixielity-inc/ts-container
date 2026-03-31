/**
 * @fileoverview Types Index
 * 
 * Re-exports Inversiland types and defines type aliases for non-exported Inversiland types.
 * 
 * @module @abdokouta/react-di
 * @category Types
 */

import type { Newable, DynamicModule, Provider } from "inversiland";

// ============================================================================
// Re-export Inversiland Types
// ============================================================================
export type {
  Newable,
  NewableModule,
  DynamicModule,
  ModuleContainer,
  Provider,
  Factory,
  AsyncFactory,
  FactoryWrapper,
  AsyncFactoryWrapper,
} from "inversiland";

// ============================================================================
// Custom Types
// ============================================================================
export type { Scope } from "./scope.type";
export type { LogLevel } from "./log-level.type";

// ============================================================================
// Type Aliases for Non-Exported Inversiland Types
// ============================================================================

/**
 * Service identifier type (from Inversify)
 * Can be a class constructor, string, or symbol
 */
export type ServiceIdentifier<T = unknown> = string | symbol | Newable<T>;

/**
 * Module metadata for @Module decorator
 * Matches Inversiland's internal ModuleMetadataArg interface
 */
export type ModuleMetadataArg = {
  imports?: (Newable | DynamicModule)[];
  providers?: Provider[];
  exports?: (ServiceIdentifier | { provide: ServiceIdentifier; deep?: boolean })[];
};

/**
 * Exported provider type
 * Matches Inversiland's internal ExportedProvider type
 */
export type ExportedProvider<T = unknown> = ServiceIdentifier<T> | { provide: ServiceIdentifier<T>; deep?: boolean };

/**
 * Detailed exported provider configuration
 * Matches Inversiland's internal DetailedExportedProvider interface
 */
export type DetailedExportedProvider<T = unknown> = {
  provide: ServiceIdentifier<T>;
  deep?: boolean;
};
