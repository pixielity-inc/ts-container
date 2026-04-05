/**
 * App Module — the root module of the application.
 *
 * Imports all feature modules and provides app-level services.
 * This is passed to `ApplicationContext.create(AppModule)` to bootstrap the DI system.
 *
 * Demonstrates:
 * - Static module imports (LoggerModule, TestingModule, LifecycleModule, ScopeModule)
 * - Dynamic module imports with forRoot/forFeature (ConfigModule, ApiModule, CacheModule)
 * - Class providers with symbol tokens
 */

import { Module } from '@abdokouta/ts-container';
import { CounterService } from '@/services/counter.service';
import { UserService } from '@/services/user.service';
import { LoggerModule } from './logger.module';
import { ConfigModule } from './config.module';
import { ApiModule } from './api.module';
import { CacheModule } from './cache.module';
import { TestingModule } from './testing.module';
import { LifecycleModule } from './lifecycle.module';
import { ScopeModule } from './scope.module';
import { COUNTER_SERVICE, USER_SERVICE } from '@/constants';

@Module({
  imports: [
    // Global logger — available to all modules without explicit imports
    LoggerModule,

    // Dynamic module with forRoot — runtime configuration
    ConfigModule.forRoot({
      apiUrl: 'https://api.example.com',
      timeout: 5000,
      retries: 3,
      environment: 'development',
    }),

    // Async factory pattern — connection established asynchronously
    ApiModule.forRoot({
      baseUrl: 'https://api.example.com',
      timeout: 3000,
    }),

    // Feature module with forFeature — @Global() makes it available everywhere
    CacheModule.forFeature({
      maxSize: 100,
      ttl: 60000,
    }),

    // Testing patterns — depends on global CacheService and LoggerService
    TestingModule,

    // Lifecycle hooks — onModuleInit / onModuleDestroy
    LifecycleModule,

    // Scope management — transient providers
    ScopeModule,
  ],
  providers: [
    { provide: COUNTER_SERVICE, useClass: CounterService },
    { provide: USER_SERVICE, useClass: UserService },
  ],
  exports: [COUNTER_SERVICE, USER_SERVICE],
})
export class AppModule {}
