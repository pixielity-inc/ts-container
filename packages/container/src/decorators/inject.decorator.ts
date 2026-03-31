import { inject } from "inversiland";
import type { ServiceIdentifier } from "../types";

/**
 * Inject Decorator
 *
 * @description
 * Injects a dependency into a constructor parameter or class property.
 * The dependency is resolved from the module's container.
 *
 * @param serviceIdentifier - The service to inject (class, symbol, or string)
 *
 * @example
 * ```typescript
 * import { Injectable, Inject } from "@abdokouta/react-di";
 *
 * @Injectable()
 * export class UserService {
 *   constructor(
 *     @Inject(Logger) private logger: Logger,
 *     @Inject(DATABASE_TOKEN) private db: Database
 *   ) {}
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Property injection
 * @Injectable()
 * export class UserService {
 *   @Inject(Logger)
 *   private logger: Logger;
 * }
 * ```
 *
 * @public
 */
export function Inject<T = unknown>(
  serviceIdentifier: ServiceIdentifier<T>,
): ParameterDecorator & PropertyDecorator {
  return inject(serviceIdentifier) as ParameterDecorator & PropertyDecorator;
}
