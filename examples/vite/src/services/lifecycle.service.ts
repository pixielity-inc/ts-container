/**
 * Lifecycle Service
 *
 * A dedicated service that demonstrates the full lifecycle pattern.
 * Manages a set of "resources" (simulated) and shows how
 * `OnModuleInit` and `OnModuleDestroy` work together.
 *
 * The container calls these automatically — no manual wiring needed.
 */

import {
  Injectable,
  Inject,
  type OnModuleInit,
  type OnModuleDestroy,
} from '@abdokouta/ts-container';
import { LOGGER_SERVICE } from '@/constants';

@Injectable()
export class LifecycleService implements OnModuleInit, OnModuleDestroy {
  private isInitialized = false;
  private resources: string[] = [];
  private cleanupCallbacks: Array<() => void> = [];

  constructor(@Inject(LOGGER_SERVICE) private logger: any) {
    this.logger.info('LifecycleService constructor called');
  }

  /**
   * Called by the container after all providers in the module
   * have been instantiated and their dependencies injected.
   *
   * Use for:
   * - Async setup (connecting to services, warming caches)
   * - Resource allocation
   * - Validation that dependencies are in the expected state
   */
  async onModuleInit(): Promise<void> {
    this.logger.info('LifecycleService.onModuleInit() — allocating resources...');

    // Simulate async resource allocation
    await new Promise((resolve) => setTimeout(resolve, 50));

    this.resources.push('Database Connection');
    this.resources.push('Cache Connection');
    this.resources.push('Message Queue');

    this.isInitialized = true;
    this.logger.info(
      `LifecycleService.onModuleInit() — ready with ${this.resources.length} resources`,
    );
  }

  /**
   * Called by the container when `app.close()` is invoked.
   *
   * Use for:
   * - Closing connections
   * - Flushing buffers
   * - Releasing resources
   * - Running registered cleanup callbacks
   */
  async onModuleDestroy(): Promise<void> {
    this.logger.info('LifecycleService.onModuleDestroy() — releasing resources...');

    for (const resource of this.resources) {
      this.logger.log(`  Releasing: ${resource}`);
    }

    for (const callback of this.cleanupCallbacks) {
      callback();
    }

    this.resources = [];
    this.cleanupCallbacks = [];
    this.isInitialized = false;
    this.logger.info('LifecycleService.onModuleDestroy() — cleanup complete');
  }

  getStatus(): { initialized: boolean; resources: string[] } {
    return {
      initialized: this.isInitialized,
      resources: [...this.resources],
    };
  }

  registerCleanup(callback: () => void): void {
    this.cleanupCallbacks.push(callback);
  }
}
