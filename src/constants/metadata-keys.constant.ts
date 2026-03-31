/**
 * Metadata Keys Constant
 *
 * Metadata keys used for reflection throughout the dependency injection system.
 */

/**
 * Metadata keys for reflection
 */
export const METADATA_KEYS = {
  MODULE: 'di:module',
  MODULE_NAME: 'di:module:name',
  PROVIDER: 'di:provider',
  PROVIDER_NAME: 'di:provider:name',
  INJECTABLE: 'di:injectable',
  GLOBAL: 'di:global:module',
} as const;
