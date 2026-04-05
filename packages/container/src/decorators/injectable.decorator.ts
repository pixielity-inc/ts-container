/**
 * @fileoverview @Injectable() decorator.
 *
 * Marks a class as a provider that can be managed by the DI container.
 * This is the most fundamental decorator in the system — any class that
 * needs to be injected or have dependencies injected into it must be
 * decorated with `@Injectable()`.
 *
 * ## What it does:
 *
 * 1. Sets the `__injectable__` watermark on the class (so the scanner can identify it)
 * 2. Stores scope options (singleton vs transient) as metadata
 * 3. TypeScript's `emitDecoratorMetadata` automatically emits `design:paramtypes`
 *    (constructor parameter types) because a decorator is present on the class
 *
 * That third point is crucial — without `@Injectable()`, TypeScript won't emit
 * the constructor parameter type metadata that the injector needs to auto-resolve
 * dependencies.
 *
 * @module decorators/injectable
 */

import 'reflect-metadata';
import { INJECTABLE_WATERMARK, SCOPE_OPTIONS_METADATA } from '@/constants';
import type { ScopeOptions } from '@/interfaces';

/**
 * Decorator that marks a class as injectable (a provider).
 *
 * @param options - Optional scope configuration
 *
 * @example
 * ```typescript
 * // Basic usage — singleton by default
 * @Injectable()
 * class UserService {
 *   constructor(private config: ConfigService) {}
 * }
 *
 * // Transient scope — new instance per injection
 * @Injectable({ scope: Scope.TRANSIENT })
 * class RequestLogger {
 *   private readonly id = Math.random();
 * }
 * ```
 */
export function Injectable(options?: ScopeOptions): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
    Reflect.defineMetadata(SCOPE_OPTIONS_METADATA, options, target);
  };
}
