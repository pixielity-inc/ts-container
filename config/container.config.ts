/**
 * @fileoverview Container Configuration
 * 
 * Default configuration values for the DI container.
 * 
 * @module @abdokouta/react-di
 * @category Config
 */
import type { IContainerConfig } from "@abdokouta/react-di";

/**
 * Default container configuration
 * 
 * These values are used when no explicit configuration is provided.
 */
export const containerConfig: Required<IContainerConfig> = {
  /**
   * Default log level
   */
  logLevel: "info",

  /**
   * Default scope for providers
   */
  defaultScope: "Singleton",
};
