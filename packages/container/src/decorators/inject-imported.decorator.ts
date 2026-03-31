import { injectImported } from "inversiland";
import type { ServiceIdentifier } from "../types";

/**
 * Inject Imported Decorator
 *
 * @description
 * Injects a dependency that is imported from another module.
 * This excludes providers defined locally in the same module.
 *
 * Use this when you need to be explicit about injecting only imported providers.
 * In most cases, use @Inject instead.
 *
 * @param serviceIdentifier - The service identifier to inject
 *
 * @example
 * ```typescript
 * import { Injectable, InjectImported } from "@abdokouta/react-di";
 *
 * @Injectable()
 * export class AppController {
 *   constructor(
 *     @InjectImported(CatsService) private catsService: CatsService
 *   ) {}
 * }
 * ```
 *
 * @public
 */
export const InjectImported = <T = unknown>(
  serviceIdentifier: ServiceIdentifier<T>,
): ParameterDecorator & PropertyDecorator => {
  return injectImported(serviceIdentifier as never) as ParameterDecorator &
    PropertyDecorator;
};
