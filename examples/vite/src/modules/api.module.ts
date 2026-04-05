/**
 * API Module
 *
 * Demonstrates a dynamic module with an async factory provider.
 * The API connection is created asynchronously (simulating a real
 * connection setup like WebSocket or database).
 */

import { Module, type DynamicModule } from '@abdokouta/ts-container';
import { ApiService, API_CONNECTION, type ApiConnection } from '@/services/api.service';
import { API_SERVICE } from '@/constants';

export interface ApiModuleOptions {
  baseUrl: string;
  timeout?: number;
}

@Module({})
export class ApiModule {
  /**
   * Configure the API module with connection options.
   *
   * Uses an async `useFactory` to simulate establishing a connection
   * before the service becomes available.
   */
  static forRoot(options: ApiModuleOptions): DynamicModule {
    return {
      module: ApiModule,
      providers: [
        {
          provide: API_CONNECTION,
          useFactory: async (): Promise<ApiConnection> => {
            // Simulate async connection setup
            await new Promise((resolve) => setTimeout(resolve, 100));

            const connection: ApiConnection = {
              baseUrl: options.baseUrl,
              isConnected: false,
              connect: async () => {
                await new Promise((resolve) => setTimeout(resolve, 200));
                connection.isConnected = true;
                console.log(`[API] Connected to ${options.baseUrl}`);
              },
              disconnect: () => {
                connection.isConnected = false;
                console.log(`[API] Disconnected from ${options.baseUrl}`);
              },
            };

            return connection;
          },
        },
        { provide: API_SERVICE, useClass: ApiService },
      ],
      exports: [API_SERVICE],
    };
  }
}
