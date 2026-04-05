/**
 * Testing Module
 *
 * Demonstrates how `@Global()` modules work in practice.
 *
 * TestableService depends on CacheService and LoggerService.
 * Neither CacheModule nor LoggerModule is imported here — they're
 * both `@Global()`, so their exports are available automatically.
 */

import { Module } from '@abdokouta/ts-container';
import { TestableService } from '@/services/testable.service';
import { TESTABLE_SERVICE } from '@/constants';

@Module({
  providers: [{ provide: TESTABLE_SERVICE, useClass: TestableService }],
  exports: [TESTABLE_SERVICE],
})
export class TestingModule {}
