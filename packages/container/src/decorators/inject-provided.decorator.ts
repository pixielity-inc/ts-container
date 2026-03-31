import { injectProvided } from "inversiland";
import type { ServiceIdentifier } from "../types";

/**
 * Inject Provided Decorator
 *
 * @description
 * Injects a dependency that is provided locally in the same module.
 * This excludes providers imported from other modules.
 *
 * Use this when you need to be explicit about injecting only local providers.
 * In most cases, use @Inject instead.
 *
 * @param serviceIdentifier - The service identifier to inject
 *
 * @example
 * ```typescript
 * import { Injectable, InjectProvided } from "@abdokouta/react-di";
 *
 * @Injectable()
 * export class CatsController {
 *   constructor(
 *     @InjectProvided(CatsService) private catsService: CatsService
 *   ) {}
 * }
 * ```
 *
 * @public
 */
export const InjectProvided = <T = unknown>(
  serviceIdentifier: ServiceIdentifier<T>,
): ParameterDecorator & PropertyDecorator => {
  return injectProvided(serviceIdentifier as never) as ParameterDecorator &
    PropertyDecorator;
};
