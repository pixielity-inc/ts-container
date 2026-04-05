/**
 * Cache Module
 *
 * Demonstrates:
 * - `@Global()` decorator — makes CacheService available to all modules
 * - `forFeature()` dynamic module pattern — feature-specific configuration
 * - `OnModuleInit` lifecycle — logs when the cache is ready
 */

import { Module, Global, type DynamicModule } from '@abdokouta/ts-container';
import { CacheService, type CacheConfig } from '@/services/cache.service';
import { CACHE_SERVICE, CACHE_CONFIG } from '@/constants';

@Global()
@Module({})
export class CacheModule {
  /**
   * Register the cache with feature-specific configuration.
   *
   * Because `@Global()` is on the class, the exported CacheService
   * is available to ALL modules without explicit imports.
   */
  static forFeature(config: CacheConfig): DynamicModule {
    return {
      module: CacheModule,
      global: true,
      providers: [
        {
          provide: CACHE_CONFIG,
          useValue: config,
        },
        { provide: CACHE_SERVICE, useClass: CacheService },
      ],
      exports: [CACHE_SERVICE],
    };
  }
}
