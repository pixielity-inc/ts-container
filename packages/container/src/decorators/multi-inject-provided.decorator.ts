import { multiInjectProvided } from "inversiland";
import type { ServiceIdentifier } from "../types";

/**
 * Multi Inject Provided Decorator
 *
 * @description
 * Injects an array of dependencies that are provided locally in the same module.
 * This excludes providers imported from other modules.
 *
 * Use this when you need to be explicit about injecting only local providers.
 * In most cases, use @MultiInject instead.
 *
 * @param serviceIdentifier - The service identifier to inject
 *
 * @example
 * ```typescript
 * import { Injectable, MultiInjectProvided } from "@abdokouta/react-di";
 *
 * @Injectable()
 * export class CatsController {
 *   constructor(
 *     @MultiInjectProvided(CatNameToken) private catNames: string[]
 *   ) {}
 * }
 * ```
 *
 * @public
 */
export const MultiInjectProvided = <T = unknown>(
  serviceIdentifier: ServiceIdentifier<T>,
): ParameterDecorator & PropertyDecorator => {
  return multiInjectProvided(serviceIdentifier as never) as ParameterDecorator &
    PropertyDecorator;
};
