import { multiInjectImported } from "inversiland";
import type { ServiceIdentifier } from "../types";

/**
 * Multi Inject Imported Decorator
 *
 * @description
 * Injects an array of dependencies that are imported from other modules.
 * This excludes providers defined locally in the same module.
 *
 * Use this when you need to be explicit about injecting only imported providers.
 * In most cases, use @MultiInject instead.
 *
 * @param serviceIdentifier - The service identifier to inject
 *
 * @example
 * ```typescript
 * import { Injectable, MultiInjectImported } from "@abdokouta/react-di";
 *
 * @Injectable()
 * export class AppController {
 *   constructor(
 *     @MultiInjectImported(CatNameToken) private catNames: string[]
 *   ) {}
 * }
 * ```
 *
 * @public
 */
export const MultiInjectImported = <T = unknown>(
  serviceIdentifier: ServiceIdentifier<T>,
): ParameterDecorator & PropertyDecorator => {
  return multiInjectImported(serviceIdentifier as never) as ParameterDecorator &
    PropertyDecorator;
};
