<p align="center">
  <img src="./assets/banner.svg" alt="@abdokouta/ts-container" width="100%" />
</p>

<h1 align="center">@abdokouta/ts-container</h1>

<p align="center">
  <strong>NestJS-style dependency injection for React and client-side apps</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@abdokouta/ts-container"><img src="https://img.shields.io/npm/v/@abdokouta/ts-container.svg?style=flat-square" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@abdokouta/ts-container"><img src="https://img.shields.io/npm/dm/@abdokouta/ts-container.svg?style=flat-square" alt="npm downloads" /></a>
  <a href="https://github.com/pixielity-inc/ts-container/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@abdokouta/ts-container.svg?style=flat-square" alt="license" /></a>
</p>

<p align="center">
  Built from scratch — no Inversify • TypeScript-first • Full lifecycle hooks • React hooks
</p>

---

## What is this?

A complete dependency injection system for TypeScript, modeled after NestJS but designed for client-side React apps. Three packages, one monorepo:

| Package                         | Description                                                            |
| ------------------------------- | ---------------------------------------------------------------------- |
| `@abdokouta/ts-container`       | Decorators, interfaces, container, injector, scanner, module system    |
| `@abdokouta/ts-container-react` | React bindings — `ContainerProvider`, `useInject`, `useOptionalInject` |
| `@abdokouta/ts-application`     | Bootstrap layer — `ApplicationContext.create(AppModule)`               |

## Features

- `@Injectable()`, `@Inject()`, `@Module()`, `@Global()`, `@Optional()` decorators
- Dynamic modules with `forRoot()` / `forFeature()` pattern
- Constructor injection + property injection
- Singleton and transient scopes
- `OnModuleInit` / `OnModuleDestroy` lifecycle hooks (sync and async)
- Circular dependency detection
- `forwardRef()` for circular module imports
- React hooks for component-level DI
- Zero external runtime dependencies (just `reflect-metadata`)

## Installation

```bash
# Core (decorators, container, injector)
pnpm add @abdokouta/ts-container reflect-metadata

# React bindings (optional — only if using React)
pnpm add @abdokouta/ts-container-react

# Application bootstrap (required to start the app)
pnpm add @abdokouta/ts-application
```

Make sure your `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Quick Start

### 1. Define services

```typescript
import { Injectable, Inject } from "@abdokouta/ts-container";

@Injectable()
export class LoggerService {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}

@Injectable()
export class UserService {
  constructor(private logger: LoggerService) {}

  getUsers() {
    this.logger.log("Fetching users...");
    return [
      { id: "1", name: "Alice" },
      { id: "2", name: "Bob" },
    ];
  }
}
```

### 2. Define a module

```typescript
import { Module } from "@abdokouta/ts-container";

@Module({
  providers: [LoggerService, UserService],
  exports: [UserService],
})
export class AppModule {}
```

### 3. Bootstrap the application

```tsx
import "reflect-metadata";
import { ApplicationContext } from "@abdokouta/ts-application";
import { ContainerProvider } from "@abdokouta/ts-container-react";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app = await ApplicationContext.create(AppModule);

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <ContainerProvider context={app}>
      <App />
    </ContainerProvider>,
  );
}

bootstrap();
```

### 4. Use in components

```tsx
import { useInject } from "@abdokouta/ts-container-react";
import { UserService } from "./services/user.service";

function UserList() {
  const userService = useInject(UserService);
  const users = userService.getUsers();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Dynamic Modules

Use `forRoot()` to pass runtime configuration:

```typescript
import { Module, type DynamicModule } from '@abdokouta/ts-container';

const CACHE_CONFIG = Symbol('CACHE_CONFIG');

@Module({})
export class CacheModule {
  static forRoot(config: CacheConfig): DynamicModule {
    return {
      module: CacheModule,
      global: true, // available to all modules
      providers: [
        { provide: CACHE_CONFIG, useValue: config },
        CacheManager,
      ],
      exports: [CacheManager],
    };
  }
}

// In AppModule:
@Module({
  imports: [
    CacheModule.forRoot({ default: 'memory', stores: { ... } }),
  ],
})
export class AppModule {}
```

## Global Modules

Use `@Global()` to make a module's exports available everywhere:

```typescript
import { Module, Global } from "@abdokouta/ts-container";

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
```

Now `LoggerService` can be injected in any module without importing `LoggerModule`.

## Lifecycle Hooks

Services can implement `OnModuleInit` and `OnModuleDestroy`:

```typescript
import {
  Injectable,
  type OnModuleInit,
  type OnModuleDestroy,
} from "@abdokouta/ts-container";

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection | null = null;

  // Called after all providers are instantiated
  async onModuleInit() {
    this.connection = await createConnection();
    console.log("Database connected");
  }

  // Called when app.close() is invoked
  async onModuleDestroy() {
    await this.connection?.close();
    console.log("Database disconnected");
  }
}
```

## Provider Types

| Type              | Syntax                                                        | Description                      |
| ----------------- | ------------------------------------------------------------- | -------------------------------- |
| Class (shorthand) | `UserService`                                                 | Bind class to itself             |
| Class             | `{ provide: TOKEN, useClass: UserService }`                   | Bind token to a class            |
| Value             | `{ provide: TOKEN, useValue: { ... } }`                       | Bind token to a value            |
| Factory           | `{ provide: TOKEN, useFactory: (dep) => ..., inject: [Dep] }` | Bind token to a factory function |
| Async Factory     | `{ provide: TOKEN, useFactory: async () => await ... }`       | Factory that returns a Promise   |
| Alias             | `{ provide: TOKEN, useExisting: OtherToken }`                 | Alias one token to another       |

## Scopes

```typescript
import { Injectable, Scope } from "@abdokouta/ts-container";

// Singleton (default) — one instance shared everywhere
@Injectable()
class ConfigService {}

// Transient — new instance per injection
@Injectable({ scope: Scope.TRANSIENT })
class RequestLogger {}
```

## React Hooks

| Hook                       | Package                         | Description                   |
| -------------------------- | ------------------------------- | ----------------------------- |
| `useInject(token)`         | `@abdokouta/ts-container-react` | Resolve a provider            |
| `useOptionalInject(token)` | `@abdokouta/ts-container-react` | Resolve or return `undefined` |
| `useContainer()`           | `@abdokouta/ts-container-react` | Access the raw resolver       |

## Decorators

| Decorator          | Description                                         |
| ------------------ | --------------------------------------------------- |
| `@Injectable()`    | Mark a class as a provider                          |
| `@Inject(token)`   | Specify injection token for a parameter or property |
| `@Optional()`      | Mark a dependency as optional                       |
| `@Module({ ... })` | Define a module with providers, imports, exports    |
| `@Global()`        | Make a module's exports available globally          |

## ApplicationContext API

```typescript
const app = await ApplicationContext.create(AppModule);

// Resolve a provider
const service = app.get(UserService);
const config = app.get<CacheConfig>(CACHE_CONFIG);

// Optional resolution
const analytics = app.getOptional(AnalyticsService); // undefined if not found

// Check existence
app.has(UserService); // true

// Module-scoped resolution
app.select(CacheModule, CacheManager);

// Graceful shutdown (calls OnModuleDestroy on all providers)
await app.close();
```

## Project Structure

```
packages/
  container/     # @abdokouta/ts-container — core DI engine
    src/
      constants.ts
      decorators/    # @Injectable, @Inject, @Module, @Global, @Optional
      interfaces/    # Type, InjectionToken, Provider, DynamicModule, etc.
      injector/      # Container, Injector, Scanner, Module, InstanceWrapper
      utils/         # forwardRef
  react/         # @abdokouta/ts-container-react — React bindings
    src/
      contexts/      # ContainerContext
      hooks/         # useInject, useOptionalInject, useContainer
      providers/     # ContainerProvider component
      interfaces/    # ContainerProviderProps
  application/   # @abdokouta/ts-application — bootstrap layer
    src/
      application-context.ts
      interfaces/    # IApplicationContext
examples/
  vite/          # Full working example with all patterns
```

## How It Works

The bootstrap sequence has three phases:

1. **Scan** — `DependenciesScanner` walks the module tree (starting from your root module), reads `@Module()` metadata, and registers all modules, providers, imports, and exports into the `NestContainer`.

2. **Instantiate** — `InstanceLoader` iterates all modules and uses the `Injector` to resolve each provider. The injector reads `design:paramtypes` (from TypeScript) and `self:paramtypes` (from `@Inject()`) to determine constructor dependencies, resolves them recursively, and calls `new Class(...deps)`.

3. **Lifecycle** — After all providers are instantiated, `onModuleInit()` is called on every provider that implements it. On shutdown, `onModuleDestroy()` is called in reverse order.

## License

MIT

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/abdokouta">Abdo Kouta</a> at <a href="https://github.com/pixielity-inc">Pixielity</a>
</p>
