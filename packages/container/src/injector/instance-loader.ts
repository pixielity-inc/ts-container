/**
 * @fileoverview InstanceLoader — orchestrates provider instantiation and lifecycle hooks.
 *
 * After the scanner has built the module graph, the InstanceLoader:
 * 1. Resolves all providers in all modules (via the Injector)
 * 2. Calls `onModuleInit()` on providers that implement it
 *
 * It also provides `destroy()` for calling `onModuleDestroy()` during shutdown.
 *
 * @module injector/instance-loader
 */

import { hasOnModuleInit, hasOnModuleDestroy } from '@/interfaces/lifecycle.interface';
import { NestContainer } from './container';
import { Injector } from './injector';
import { Module } from './module';

/**
 * Loads (instantiates) all providers and runs lifecycle hooks.
 */
export class InstanceLoader {
  private readonly injector: Injector;

  constructor(private readonly container: NestContainer) {
    this.injector = new Injector();
  }

  /**
   * Instantiate all providers in all modules.
   *
   * Iterates modules and resolves each module's providers.
   * After all providers are resolved, calls `onModuleInit()` lifecycle hooks.
   */
  public async createInstances(): Promise<void> {
    const modules = this.container.getModules();

    // Phase 1: Resolve all providers
    for (const [, moduleRef] of modules) {
      await this.injector.resolveProviders(moduleRef);
    }

    // Phase 2: Call onModuleInit() lifecycle hooks
    for (const [, moduleRef] of modules) {
      await this.callModuleInitHooks(moduleRef);
    }
  }

  /**
   * Call `onModuleDestroy()` on all providers that implement it.
   *
   * Called during application shutdown. Iterates modules in reverse
   * order (leaf modules first, root module last).
   */
  public async destroy(): Promise<void> {
    const modules = [...this.container.getModules().values()].reverse();

    for (const moduleRef of modules) {
      await this.callModuleDestroyHooks(moduleRef);
    }
  }

  /**
   * Get the injector instance (for direct resolution outside the module system).
   */
  public getInjector(): Injector {
    return this.injector;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Private: Lifecycle hooks
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Call `onModuleInit()` on all resolved providers in a module.
   */
  private async callModuleInitHooks(moduleRef: Module): Promise<void> {
    for (const [, wrapper] of moduleRef.providers) {
      if (wrapper.isResolved && wrapper.instance && hasOnModuleInit(wrapper.instance)) {
        await wrapper.instance.onModuleInit();
      }
    }
  }

  /**
   * Call `onModuleDestroy()` on all resolved providers in a module.
   */
  private async callModuleDestroyHooks(moduleRef: Module): Promise<void> {
    for (const [, wrapper] of moduleRef.providers) {
      if (wrapper.isResolved && wrapper.instance && hasOnModuleDestroy(wrapper.instance)) {
        await wrapper.instance.onModuleDestroy();
      }
    }
  }
}
