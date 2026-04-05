/**
 * Logger Module
 *
 * Demonstrates the `@Global()` decorator.
 *
 * Global modules make their exported providers available to ALL modules
 * without explicit imports. LoggerService can be injected anywhere.
 */

import { Module, Global } from '@abdokouta/ts-container';
import { LoggerService } from '@/services/logger.service';
import { LOGGER_SERVICE } from '@/constants';

@Global()
@Module({
  providers: [{ provide: LOGGER_SERVICE, useClass: LoggerService }],
  exports: [LOGGER_SERVICE],
})
export class LoggerModule {}
