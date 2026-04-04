/**
 * Metadata Keys Constant
 *
 * Metadata keys used for reflection throughout the dependency injection system.
 */

/**
 * Metadata keys for reflection
 */
export const METADATA_KEYS = {
  MODULE: "di:module",
  PROVIDER: "di:provider",
  GLOBAL: "di:global:module",
  INJECTABLE: "di:injectable",
  MODULE_NAME: "di:module:name",
  PROVIDER_NAME: "di:provider:name",
} as const;
