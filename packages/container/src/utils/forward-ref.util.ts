/**
 * @fileoverview forwardRef utility — resolves circular module dependencies.
 *
 * @module utils/forward-ref
 */

import type { ForwardReference } from '@/interfaces';

/**
 * Creates a forward reference to break circular dependency chains.
 *
 * When two modules import each other, TypeScript may resolve one of them
 * as `undefined` due to the ES module evaluation order. `forwardRef()`
 * wraps the reference in a function that's called later, after both
 * modules have been fully defined.
 *
 * @param fn - A function that returns the class reference
 * @returns A ForwardReference object
 *
 * @example
 * ```typescript
 * // cats.module.ts
 * @Module({
 *   imports: [forwardRef(() => DogsModule)],
 * })
 * class CatsModule {}
 *
 * // dogs.module.ts
 * @Module({
 *   imports: [forwardRef(() => CatsModule)],
 * })
 * class DogsModule {}
 * ```
 */
export function forwardRef<T = any>(fn: () => T): ForwardReference<T> {
  return { forwardRef: fn };
}
