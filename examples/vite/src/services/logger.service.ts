/**
 * Logger Service
 *
 * Implements `OnModuleInit` to log when the logger is ready.
 * A simple example — in a real app you might open a log stream
 * or connect to a remote logging service here.
 */

import { Injectable, type OnModuleInit } from '@abdokouta/ts-container';

@Injectable()
export class LoggerService implements OnModuleInit {
  private initialized = false;

  /**
   * Called automatically by the container after all providers
   * in the module are instantiated.
   */
  onModuleInit(): void {
    this.initialized = true;
    this.info('LoggerService initialized and ready');
  }

  log(message: string, ...args: unknown[]) {
    console.log(`[LOG]: ${message}`, ...args);
  }

  error(message: string, ...args: unknown[]) {
    console.error(`[ERROR]: ${message}`, ...args);
  }

  info(message: string, ...args: unknown[]) {
    console.info(`[INFO]: ${message}`, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    console.warn(`[WARN]: ${message}`, ...args);
  }

  isReady(): boolean {
    return this.initialized;
  }
}
