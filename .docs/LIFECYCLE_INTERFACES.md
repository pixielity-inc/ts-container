# Lifecycle Interfaces

## Overview

`@abdokouta/react-di` provides NestJS-style lifecycle interfaces that allow services to hook into the module initialization and destruction phases.

## Available Interfaces

### OnModuleInit

Interface for services that need to perform initialization logic after all dependencies have been injected.

```typescript
interface OnModuleInit {
  onModuleInit(): void | Promise<void>;
}
```

**When to use:**
- Initialize resources (database connections, file handles)
- Load configuration
- Set up event listeners
- Perform async setup operations
- Validate service state

**Example:**
```typescript
import { Injectable, Inject, OnModuleInit } from '@abdokouta/react-di';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private connection: any = null;

  constructor(@Inject(ConfigService) private config: ConfigService) {}

  async onModuleInit(): Promise<void> {
    console.log('Initializing database connection...');
    this.connection = await createConnection(this.config.getDatabaseUrl());
    console.log('Database connected');
  }

  query(sql: string) {
    if (!this.connection) {
      throw new Error('Database not connected');
    }
    return this.connection.query(sql);
  }
}
```

### OnModuleDestroy

Interface for services that need to perform cleanup logic before the module is destroyed.

```typescript
interface OnModuleDestroy {
  onModuleDestroy(): void | Promise<void>;
}
```

**When to use:**
- Close database connections
- Clean up file handles
- Remove event listeners
- Cancel pending operations
- Release resources

**Example:**
```typescript
import { Injectable, OnModuleDestroy } from '@abdokouta/react-di';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private connection: any = null;

  async onModuleDestroy(): Promise<void> {
    console.log('Closing database connection...');
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
    console.log('Database disconnected');
  }
}
```

## Module Configuration

To enable lifecycle hooks, configure the provider with `onActivation` and `onDeactivation`:

```typescript
import { Module, hasOnModuleInit, hasOnModuleDestroy } from '@abdokouta/react-di';

@Module({
  providers: [
    {
      provide: DatabaseService,
      useClass: DatabaseService,
      scope: 'Singleton',
      onActivation: async (context, instance) => {
        // Call OnModuleInit if implemented
        if (hasOnModuleInit(instance)) {
          await instance.onModuleInit();
        }
        return instance;
      },
      onDeactivation: async (instance) => {
        // Call OnModuleDestroy if implemented
        if (hasOnModuleDestroy(instance)) {
          await instance.onModuleDestroy();
        }
      },
    },
  ],
})
export class DatabaseModule {}
```

## Complete Example

```typescript
import { Injectable, Inject, OnModuleInit, OnModuleDestroy } from '@abdokouta/react-di';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private cache = new Map<string, any>();
  private cleanupInterval?: NodeJS.Timeout;

  constructor(@Inject(LoggerService) private logger: LoggerService) {}

  async onModuleInit(): Promise<void> {
    this.logger.info('CacheService initializing...');
    
    // Set up periodic cleanup
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000); // Every minute

    this.logger.info('CacheService initialized');
  }

  onModuleDestroy(): void {
    this.logger.info('CacheService destroying...');
    
    // Clear interval
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    // Clear cache
    this.cache.clear();

    this.logger.info('CacheService destroyed');
  }

  set(key: string, value: any): void {
    this.cache.set(key, value);
  }

  get(key: string): any {
    return this.cache.get(key);
  }

  private cleanup(): void {
    // Cleanup logic
    this.logger.log('Running cache cleanup...');
  }
}
```

## Type Guards

The package provides type guard functions to check if an object implements the lifecycle interfaces:

```typescript
import { hasOnModuleInit, hasOnModuleDestroy } from '@abdokouta/react-di';

const service = new MyService();

if (hasOnModuleInit(service)) {
  await service.onModuleInit();
}

if (hasOnModuleDestroy(service)) {
  service.onModuleDestroy();
}
```

## Best Practices

### 1. Keep Initialization Logic Simple

```typescript
// ✅ Good - Simple initialization
async onModuleInit() {
  await this.connect();
}

// ❌ Bad - Too much logic
async onModuleInit() {
  await this.connect();
  await this.loadConfig();
  await this.setupListeners();
  await this.validateState();
  // Too many responsibilities
}
```

### 2. Handle Errors Gracefully

```typescript
// ✅ Good - Error handling
async onModuleInit() {
  try {
    await this.connect();
  } catch (error) {
    this.logger.error('Failed to connect:', error);
    throw error; // Re-throw to prevent app startup
  }
}
```

### 3. Clean Up All Resources

```typescript
// ✅ Good - Complete cleanup
onModuleDestroy() {
  this.removeAllListeners();
  this.closeConnections();
  this.clearTimers();
  this.releaseResources();
}

// ❌ Bad - Incomplete cleanup
onModuleDestroy() {
  this.closeConnections();
  // Forgot to clean up listeners and timers!
}
```

### 4. Use Async When Needed

```typescript
// ✅ Good - Async for async operations
async onModuleInit() {
  await this.asyncOperation();
}

// ⚠️ Avoid - Sync wrapper for async operation
onModuleInit() {
  this.asyncOperation(); // Fire and forget - not recommended
}
```

### 5. Don't Depend on Execution Order

```typescript
// ❌ Bad - Assuming order
@Injectable()
class ServiceA implements OnModuleInit {
  onModuleInit() {
    // Assuming ServiceB is already initialized
    this.serviceB.doSomething(); // May fail!
  }
}

// ✅ Good - Defensive programming
@Injectable()
class ServiceA implements OnModuleInit {
  onModuleInit() {
    if (this.serviceB.isReady()) {
      this.serviceB.doSomething();
    }
  }
}
```

## Comparison with NestJS

### NestJS
```typescript
@Injectable()
export class MyService implements OnModuleInit, OnModuleDestroy {
  onModuleInit() {
    // Automatically called by NestJS
  }

  onModuleDestroy() {
    // Automatically called by NestJS
  }
}
```

### @abdokouta/react-di
```typescript
@Injectable()
export class MyService implements OnModuleInit, OnModuleDestroy {
  onModuleInit() {
    // Called via module's onActivation hook
  }

  onModuleDestroy() {
    // Called via module's onDeactivation hook
  }
}

// Module configuration required
@Module({
  providers: [
    {
      provide: MyService,
      useClass: MyService,
      onActivation: async (ctx, instance) => {
        if (hasOnModuleInit(instance)) {
          await instance.onModuleInit();
        }
        return instance;
      },
      onDeactivation: async (instance) => {
        if (hasOnModuleDestroy(instance)) {
          await instance.onModuleDestroy();
        }
      },
    },
  ],
})
export class MyModule {}
```

## Lifecycle Flow

```
1. Constructor called
   ↓
2. Dependencies injected
   ↓
3. onActivation hook (Inversiland)
   ↓
4. onModuleInit() called (if implemented)
   ↓
5. Service ready for use
   ↓
   ... (service lifetime) ...
   ↓
6. Container disposal triggered
   ↓
7. onDeactivation hook (Inversiland)
   ↓
8. onModuleDestroy() called (if implemented)
   ↓
9. Service destroyed
```

## React Integration

When using lifecycle hooks with React:

```typescript
import { useInject } from '@abdokouta/react-di';
import { useEffect } from 'react';

function MyComponent() {
  // Service is already initialized via onModuleInit
  const service = useInject(MyService);
  
  useEffect(() => {
    // Service is ready to use
    service.doWork();
    
    // Component cleanup (not service cleanup)
    return () => {
      // Don't call service.onModuleDestroy() here
      // That's handled by the DI container
    };
  }, [service]);
  
  return <div>{service.getData()}</div>;
}
```

## Summary

- ✅ `OnModuleInit` for initialization after dependency injection
- ✅ `OnModuleDestroy` for cleanup before destruction
- ✅ Both support sync and async operations
- ✅ Type guards available: `hasOnModuleInit`, `hasOnModuleDestroy`
- ✅ Requires module configuration with `onActivation`/`onDeactivation`
- ✅ Similar to NestJS but requires explicit hook configuration

---

**See Also:**
- [Lifecycle Hooks Documentation](./LIFECYCLE_HOOKS.md)
- [Inversiland Documentation](https://github.com/carlossalasamper/inversiland)
- [NestJS Lifecycle Events](https://docs.nestjs.com/fundamentals/lifecycle-events)
