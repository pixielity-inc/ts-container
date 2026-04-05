/**
 * Lifecycle Module
 *
 * Demonstrates the `OnModuleInit` and `OnModuleDestroy` lifecycle hooks.
 *
 * In our container, lifecycle hooks are called automatically:
 * - `onModuleInit()` is called after all providers are instantiated
 * - `onModuleDestroy()` is called when `app.close()` is invoked
 *
 * No manual `onActivation`/`onDeactivation` wiring needed — the container
 * detects the interfaces and calls them automatically.
 */

import { Module } from '@abdokouta/ts-container';
import { LifecycleService } from '@/services/lifecycle.service';
import { LIFECYCLE_SERVICE } from '@/constants';

@Module({
  providers: [
    { provide: LIFECYCLE_SERVICE, useClass: LifecycleService },
  ],
  exports: [LIFECYCLE_SERVICE],
})
export class LifecycleModule {}
