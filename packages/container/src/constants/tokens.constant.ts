/**
 * @fileoverview Metadata keys and constants used throughout the DI system.
 *
 * These constants define the metadata keys that decorators write to classes
 * and that the injector reads during resolution. They mirror NestJS's
 * internal constants but are simplified for client-side use.
 *
 * ## How metadata flows:
 *
 * 1. **Decorators** write metadata using `Reflect.defineMetadata(KEY, value, target)`
 * 2. **Scanner** reads module metadata (`imports`, `providers`, `exports`) to build the module graph
 * 3. **Injector** reads constructor metadata (`design:paramtypes`, `self:paramtypes`) to resolve dependencies
 *
 * @module constants
 */

// ─────────────────────────────────────────────────────────────────────────────
// Module metadata keys
// Written by @Module() decorator, read by DependenciesScanner
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Keys used by the `@Module()` decorator to store module configuration.
 *
 * The `@Module()` decorator iterates over the metadata object and calls
 * `Reflect.defineMetadata(key, value, target)` for each property.
 *
 * @example
 * ```typescript
 * // When you write:
 * @Module({ imports: [ConfigModule], providers: [UserService], exports: [UserService] })
 * class AppModule {}
 *
 * // The decorator stores:
 * Reflect.defineMetadata('imports', [ConfigModule], AppModule)
 * Reflect.defineMetadata('providers', [UserService], AppModule)
 * Reflect.defineMetadata('exports', [UserService], AppModule)
 * ```
 */
export const MODULE_METADATA = {
  IMPORTS: 'imports',
  PROVIDERS: 'providers',
  EXPORTS: 'exports',
} as const;

/**
 * Metadata key set by `@Global()` decorator.
 * When present and `true`, the module's exported providers are available
 * to all other modules without explicit imports.
 */
export const GLOBAL_MODULE_METADATA = '__module:global__';

// ─────────────────────────────────────────────────────────────────────────────
// Injectable metadata keys
// Written by @Injectable() decorator, read by Injector
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Watermark set by `@Injectable()` to mark a class as a provider.
 * The scanner uses this to validate that providers are properly decorated.
 */
export const INJECTABLE_WATERMARK = '__injectable__';

/**
 * Scope options metadata set by `@Injectable({ scope: Scope.REQUEST })`.
 * For client-side use, we primarily support DEFAULT (singleton) and TRANSIENT.
 */
export const SCOPE_OPTIONS_METADATA = 'scope:options';

// ─────────────────────────────────────────────────────────────────────────────
// Constructor injection metadata keys
// Written by @Inject() and TypeScript's emitDecoratorMetadata
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TypeScript's built-in metadata key for constructor parameter types.
 * Automatically emitted when `emitDecoratorMetadata: true` in tsconfig.
 *
 * Contains an array of constructor parameter types (class references).
 * This is the primary source for auto-resolving dependencies.
 *
 * @example
 * ```typescript
 * @Injectable()
 * class UserService {
 *   constructor(private config: ConfigService, private logger: LoggerService) {}
 * }
 * // TypeScript emits: Reflect.defineMetadata('design:paramtypes', [ConfigService, LoggerService], UserService)
 * ```
 */
export const PARAMTYPES_METADATA = 'design:paramtypes';

/**
 * Metadata key for explicitly declared constructor dependencies.
 * Written by `@Inject(token)` decorator for constructor parameters.
 *
 * Contains an array of `{ index: number, param: InjectionToken }` objects.
 * These override the auto-detected types from `design:paramtypes`.
 *
 * @example
 * ```typescript
 * @Injectable()
 * class CacheService {
 *   constructor(@Inject(CACHE_CONFIG) private config: CacheConfig) {}
 * }
 * // @Inject writes: [{ index: 0, param: CACHE_CONFIG }] to 'self:paramtypes'
 * ```
 */
export const SELF_DECLARED_DEPS_METADATA = 'self:paramtypes';

/**
 * Metadata key for optional constructor dependencies.
 * Written by `@Optional()` decorator for constructor parameters.
 *
 * Contains an array of parameter indices that are optional.
 * If resolution fails for an optional dependency, `undefined` is injected instead of throwing.
 */
export const OPTIONAL_DEPS_METADATA = 'optional:paramtypes';

// ─────────────────────────────────────────────────────────────────────────────
// Property injection metadata keys
// Written by @Inject() on class properties
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Metadata key for property-based injection targets.
 * Written by `@Inject(token)` when used on a class property.
 *
 * Contains an array of `{ key: string, type: InjectionToken }` objects.
 *
 * @example
 * ```typescript
 * @Injectable()
 * class UserService {
 *   @Inject(LoggerService)
 *   private logger!: LoggerService;
 * }
 * ```
 */
export const PROPERTY_DEPS_METADATA = 'self:properties_metadata';

/**
 * Metadata key for optional property dependencies.
 * Written by `@Optional()` when used on a class property.
 *
 * Contains an array of property keys that are optional.
 */
export const OPTIONAL_PROPERTY_DEPS_METADATA = 'optional:properties_metadata';
