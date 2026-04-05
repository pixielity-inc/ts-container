/**
 * @fileoverview Scope options for the @Injectable() decorator.
 * @module interfaces/scope-options
 */

import type { Scope } from './scope.enum';

/**
 * Options that can be passed to `@Injectable()` to control provider scoping.
 *
 * @example
 * ```typescript
 * @Injectable({ scope: Scope.TRANSIENT })
 * class TransientService {}
 * ```
 */
export interface ScopeOptions {
  /**
   * The scope of the provider.
   * @default Scope.DEFAULT (singleton)
   */
  scope?: Scope;
}
