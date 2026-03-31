/**
 * Scope types for providers
 *
 * @description
 * Defines the lifecycle scope of a provider instance.
 *
 * - Singleton: Single instance shared across the application
 * - Transient: New instance created for each injection
 * - Request: Single instance per request (useful for request-scoped data)
 */
export type Scope = 'Singleton' | 'Transient' | 'Request';
