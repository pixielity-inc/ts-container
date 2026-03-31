import { optional } from "inversiland";

/**
 * Optional Decorator
 *
 * @description
 * Marks an injected dependency as optional.
 * If the dependency is not available, undefined will be injected instead of throwing an error.
 *
 * @example
 * ```typescript
 * import { Injectable, Inject, Optional } from "@abdokouta/react-di";
 *
 * @Injectable()
 * export class UserService {
 *   constructor(
 *     @Inject(Logger) private logger: Logger,
 *     @Inject(Cache) @Optional() private cache?: Cache
 *   ) {}
 *
 *   getUser(id: string) {
 *     if (this.cache) {
 *       return this.cache.get(id);
 *     }
 *     return this.fetchUser(id);
 *   }
 * }
 * ```
 *
 * @public
 */
export function Optional(): ParameterDecorator & PropertyDecorator {
  return optional() as ParameterDecorator & PropertyDecorator;
}
