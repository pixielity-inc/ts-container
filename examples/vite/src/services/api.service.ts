/**
 * API Service
 *
 * Implements `OnModuleInit` to eagerly connect on bootstrap,
 * and `OnModuleDestroy` to disconnect on shutdown.
 *
 * Demonstrates async lifecycle hooks — `onModuleInit()` returns
 * a Promise, and the container awaits it before continuing.
 */

import {
  Injectable,
  Inject,
  type OnModuleInit,
  type OnModuleDestroy,
} from '@abdokouta/ts-container';
import { LOGGER_SERVICE } from '@/constants';

export const API_CONNECTION = Symbol.for('API_CONNECTION');

export interface ApiConnection {
  baseUrl: string;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

@Injectable()
export class ApiService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(API_CONNECTION) private connection: ApiConnection,
    @Inject(LOGGER_SERVICE) private logger: any,
  ) {}

  /**
   * Called after all providers are instantiated.
   * Eagerly establishes the API connection so it's ready
   * before any component tries to use it.
   */
  async onModuleInit(): Promise<void> {
    this.logger.info('ApiService initializing — connecting...');
    await this.connection.connect();
    this.logger.info(`ApiService ready — connected to ${this.connection.baseUrl}`);
  }

  /**
   * Called on application shutdown.
   * Cleanly disconnects from the API.
   */
  onModuleDestroy(): void {
    this.logger.info('ApiService shutting down — disconnecting...');
    this.connection.disconnect();
  }

  async fetchData<T>(endpoint: string): Promise<T> {
    if (!this.connection.isConnected) {
      await this.connection.connect();
    }

    this.logger.log(`Fetching data from ${this.connection.baseUrl}${endpoint}`);

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: 'mock data' } as T);
      }, 500);
    });
  }

  getConnectionStatus(): boolean {
    return this.connection.isConnected;
  }

  getBaseUrl(): string {
    return this.connection.baseUrl;
  }
}
