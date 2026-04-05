/**
 * @fileoverview Type interface — represents a class constructor.
 *
 * This is the fundamental type used throughout the DI system to represent
 * classes that can be instantiated with `new`.
 *
 * @module interfaces/type
 */

/**
 * Represents a class constructor (a "newable" type).
 *
 * Used as the type for:
 * - Provider metatypes (the class to instantiate)
 * - Injection tokens (when using class-based tokens)
 * - Module classes
 *
 * @typeParam T - The instance type that the constructor creates
 *
 * @example
 * ```typescript
 * // Any class satisfies Type<T>
 * class UserService {}
 * const type: Type<UserService> = UserService;
 *
 * // Can be used to create instances
 * const instance = new type();
 * ```
 */
export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
