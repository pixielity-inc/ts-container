/**
 * @fileoverview Interfaces Index
 * 
 * Re-exports custom interface definitions (not from Inversiland).
 * 
 * @module @abdokouta/react-di
 * @category Interfaces
 */

// ============================================================================
// Module Configuration Interfaces
// ============================================================================
export type { IContainerConfig } from "./container-config.interface";
export type { IModuleOptions } from "./module-options.interface";
export type { IModuleAsyncOptions } from "./module-async-options.interface";

// ============================================================================
// Lifecycle Interfaces
// ============================================================================
export type { OnModuleInit, OnModuleDestroy } from "./lifecycle.interface";
export { hasOnModuleInit, hasOnModuleDestroy } from "./lifecycle.interface";

// ============================================================================
// Component Interfaces
// ============================================================================
export type { ContainerProviderProps } from "./container-provider-props.interface";
