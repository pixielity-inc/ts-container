/**
 * @fileoverview Lifecycle hook interfaces.
 *
 * Providers can implement these interfaces to hook into the application
 * lifecycle. The container calls these methods at specific points during
 * bootstrap and shutdown.
 *
 * ## Lifecycle order:
 *
 * **Bootstrap:**
 * 1. All providers are instantiated (constructor injection)
 * 2. `onModuleInit()` is called on all providers that implement it
 *
 * **Shutdown:**
 * 1. `onModuleDestroy()` is called on all providers that implement it
 * 2. Provider references are released
 *
 * @module interfaces/lifecycle
 */

/**
 * Interface for providers that need initialization after construction.
 *
 * `onModuleInit()` is called after all providers in the module have been
 * instantiated and their dependencies injected. This is the right place
 * for async initialization like connecting to databases or warming caches.
 *
 * @example
 * ```typescript
 * @Injectable()
 * class DatabaseService implements OnModuleInit {
 *   private connection: Connection;
 *
 *   constructor(@Inject(DB_CONFIG) private config: DbConfig) {}
 *
 *   async onModuleInit() {
 *     // All dependencies are available here
 *     this.connection = await createConnection(this.config);
 *   }
 * }
 * ```
 */
export interface OnModuleInit {
  onModuleInit(): any | Promise<any>;
}

/**
 * Interface for providers that need cleanup before shutdown.
 *
 * `onModuleDestroy()` is called when the application is shutting down.
 * Use this to close connections, flush buffers, and release resources.
 *
 * @example
 * ```typescript
 * @Injectable()
 * class RedisManager implements OnModuleDestroy {
 *   async onModuleDestroy() {
 *     await this.disconnectAll();
 *   }
 * }
 * ```
 */
export interface OnModuleDestroy {
  onModuleDestroy(): any | Promise<any>;
}

/**
 * Type guard: check if an object implements OnModuleInit.
 */
export function hasOnModuleInit(instance: any): instance is OnModuleInit {
  return instance && typeof instance.onModuleInit === 'function';
}

/**
 * Type guard: check if an object implements OnModuleDestroy.
 */
export function hasOnModuleDestroy(instance: any): instance is OnModuleDestroy {
  return instance && typeof instance.onModuleDestroy === 'function';
}
