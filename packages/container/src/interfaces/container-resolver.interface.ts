/**
 * @fileoverview ContainerResolver — minimal interface for resolving providers.
 *
 * This is the contract that any DI resolver must implement. It's used by:
 * - `@abdokouta/ts-container/react` (ContainerProvider accepts this)
 * - `@pixielity/application` (ApplicationContext implements this)
 * - Any custom resolver or testing mock
 *
 * By depending on this interface instead of a concrete class, consumers
 * stay decoupled from the bootstrap implementation.
 *
 * @module interfaces/container-resolver
 */

import type { InjectionToken } from './injection-token.interface';

/**
 * Minimal interface for resolving providers from a DI container.
 *
 * Any object that can look up providers by token can implement this.
 * The React hooks (`useInject`, etc.) depend on this interface,
 * not on the concrete `ApplicationContext`.
 *
 * @example
 * ```typescript
 * // ApplicationContext implements this
 * const app: ContainerResolver = await ApplicationContext.create(AppModule);
 * const service = app.get(UserService);
 *
 * // You can also create a mock for testing
 * const mock: ContainerResolver = {
 *   get: (token) => mockInstances.get(token),
 *   getOptional: (token) => mockInstances.get(token),
 *   has: (token) => mockInstances.has(token),
 * };
 * ```
 */
export interface ContainerResolver {
  /**
   * Resolve a provider by its injection token.
   *
   * @param token - The injection token (class, string, or symbol)
   * @returns The resolved provider instance
   * @throws Error if the provider is not found
   */
  get<T = any>(token: InjectionToken<T>): T;

  /**
   * Try to resolve a provider, returning `undefined` if not found.
   *
   * @param token - The injection token
   * @returns The resolved instance or undefined
   */
  getOptional<T = any>(token: InjectionToken<T>): T | undefined;

  /**
   * Check if a provider is registered.
   *
   * @param token - The injection token to check
   * @returns `true` if the provider exists
   */
  has(token: InjectionToken): boolean;
}
