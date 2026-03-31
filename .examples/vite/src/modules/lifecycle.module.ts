import { Module } from '@abdokouta/react-di';
import { LoggerService } from '@/services/logger.service';
import { LifecycleService } from '@/services/lifecycle.service';

/**
 * Module demonstrating lifecycle hooks
 * Uses onActivation and onDeactivation from Inversiland
 * to call OnModuleInit and OnModuleDestroy interface methods
 */
@Module({
  providers: [
    LoggerService,
    {
      provide: LifecycleService,
      useClass: LifecycleService,
      scope: 'Singleton',
      onActivation: async (context, instance) => {
        // Called after instance is created, before it's returned
        // Calls OnModuleInit.onModuleInit() if implemented
        await instance.onModuleInit();
        return instance;
      },
      onDeactivation: (instance) => {
        // Called when container is disposed
        // Calls OnModuleDestroy.onModuleDestroy() if implemented
        instance.onModuleDestroy();
      },
    },
  ],
  exports: [LifecycleService],
})
export class LifecycleModule {}
