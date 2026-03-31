/**
 * Interface for services that need to perform initialization logic
 * after all dependencies have been injected.
 * 
 * Similar to NestJS's OnModuleInit interface.
 * 
 * @example
 * ```typescript
 * @Injectable()
 * export class DatabaseService implements OnModuleInit {
 *   async onModuleInit() {
 *     await this.connect();
 *   }
 * }
 * ```
 */
export interface OnModuleInit {
  /**
   * Called after the module has been initialized and all dependencies injected.
   * Can be async for asynchronous initialization.
   */
  onModuleInit(): void | Promise<void>;
}

/**
 * Interface for services that need to perform cleanup logic
 * before the module is destroyed.
 * 
 * Similar to NestJS's OnModuleDestroy interface.
 * 
 * @example
 * ```typescript
 * @Injectable()
 * export class DatabaseService implements OnModuleDestroy {
 *   async onModuleDestroy() {
 *     await this.disconnect();
 *   }
 * }
 * ```
 */
export interface OnModuleDestroy {
  /**
   * Called before the module is destroyed.
   * Can be async for asynchronous cleanup.
   */
  onModuleDestroy(): void | Promise<void>;
}

/**
 * Type guard to check if an object implements OnModuleInit
 */
export function hasOnModuleInit(obj: any): obj is OnModuleInit {
  return obj != null && typeof obj.onModuleInit === 'function';
}

/**
 * Type guard to check if an object implements OnModuleDestroy
 */
export function hasOnModuleDestroy(obj: any): obj is OnModuleDestroy {
  return obj != null && typeof obj.onModuleDestroy === 'function';
}
