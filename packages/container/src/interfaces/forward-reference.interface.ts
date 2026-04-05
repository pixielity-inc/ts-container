/**
 * @fileoverview Forward reference — for resolving circular dependencies.
 *
 * @module interfaces/forward-reference
 */

/**
 * A forward reference wraps a class reference in a function to break
 * circular dependency chains in the module graph.
 *
 * @example
 * ```typescript
 * import { forwardRef } from '@abdokouta/ts-container';
 *
 * @Module({
 *   imports: [forwardRef(() => CatsModule)],
 * })
 * class DogsModule {}
 * ```
 */
export interface ForwardReference<T = any> {
  forwardRef: () => T;
}
