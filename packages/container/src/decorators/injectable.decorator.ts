import { injectable } from "inversiland";

/**
 * Injectable Decorator
 *
 * @description
 * Marks a class as injectable, allowing it to be instantiated and managed
 * by the dependency injection container.
 *
 * @example
 * ```typescript
 * import { Injectable, Inject } from "@abdokouta/react-di";
 *
 * @Injectable()
 * export class UserService {
 *   constructor(
 *     @Inject(Logger) private logger: Logger
 *   ) {}
 *
 *   getUsers() {
 *     this.logger.log("Fetching users");
 *     return [];
 *   }
 * }
 * ```
 *
 * @public
 */
export const Injectable = (): ClassDecorator => {
  return injectable() as ClassDecorator;
};
