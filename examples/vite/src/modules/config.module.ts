/**
 * Configuration Module
 *
 * Demonstrates the `forRoot()` dynamic module pattern.
 * Accepts runtime configuration and provides it as a value provider.
 */

import { Module, type DynamicModule } from '@abdokouta/ts-container';
import { ConfigService, type AppConfig } from '@/services/config.service';
import { CONFIG_SERVICE } from '@/constants';

@Module({})
export class ConfigModule {
  /**
   * Configure the module with runtime options.
   * Creates a ConfigService instance with the provided config
   * and registers it as a value provider.
   */
  static forRoot(config: AppConfig): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_SERVICE,
          useValue: new ConfigService(config),
        },
      ],
      exports: [CONFIG_SERVICE],
    };
  }
}
