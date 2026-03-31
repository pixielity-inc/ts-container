import { multiInject } from "inversiland";
import type { ServiceIdentifier } from "../types";

/**
 * MultiInject Decorator
 *
 * @description
 * Injects multiple dependencies with the same service identifier.
 * Returns an array of all matching services.
 *
 * @param serviceIdentifier - The service identifier to inject
 *
 * @example
 * ```typescript
 * import { Injectable, MultiInject } from "@abdokouta/react-di";
 *
 * const PLUGIN_TOKEN = Symbol.for("Plugin");
 *
 * @Injectable()
 * export class PluginManager {
 *   constructor(
 *     @MultiInject(PLUGIN_TOKEN) private plugins: Plugin[]
 *   ) {}
 *
 *   loadPlugins() {
 *     this.plugins.forEach(plugin => plugin.init());
 *   }
 * }
 * ```
 *
 * @public
 */
export function MultiInject<T = unknown>(
  serviceIdentifier: ServiceIdentifier<T>,
): ParameterDecorator & PropertyDecorator {
  return multiInject(serviceIdentifier) as ParameterDecorator &
    PropertyDecorator;
}
