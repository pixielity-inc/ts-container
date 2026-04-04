<p align="center">
  <img src="https://raw.githubusercontent.com/abdokouta/react-di/main/assets/banner.svg" alt="@abdokouta/react-di" width="100%" />
</p>

<h1 align="center">@abdokouta/react-di</h1>

<p align="center">
  <strong>Powerful dependency injection for React with NestJS-style modules</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@abdokouta/react-di"><img src="https://img.shields.io/npm/v/@abdokouta/react-di.svg?style=flat-square" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@abdokouta/react-di"><img src="https://img.shields.io/npm/dm/@abdokouta/react-di.svg?style=flat-square" alt="npm downloads" /></a>
  <a href="https://github.com/abdokouta/react-di/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@abdokouta/react-di.svg?style=flat-square" alt="license" /></a>
  <a href="https://github.com/abdokouta/react-di"><img src="https://img.shields.io/github/stars/abdokouta/react-di?style=flat-square" alt="GitHub stars" /></a>
</p>

<p align="center">
  Built on top of <a href="https://github.com/inversiland/inversiland">Inversiland</a> • TypeScript-first • Zero boilerplate
</p>

---

## ✨ Features

- 🎯 **NestJS-style modules** - Familiar patterns for organizing your React app
- 💉 **Powerful DI** - Constructor injection with decorators
- 🔄 **Dynamic modules** - `forRoot` and `forFeature` patterns
- ⚛️ **React hooks** - `useInject` for seamless component integration
- 🌍 **Global modules** - Share services across your entire app
- 🔥 **HMR support** - Works perfectly with Vite hot module replacement
- 📦 **Tree-shakeable** - Only bundle what you use
- 🎨 **TypeScript-first** - Full type safety and IntelliSense

## 📦 Installation

```bash
npm install @abdokouta/react-di reflect-metadata
# or
yarn add @abdokouta/react-di reflect-metadata
# or
pnpm add @abdokouta/react-di reflect-metadata
```

> **Note:** Make sure to enable `experimentalDecorators` and `emitDecoratorMetadata` in your `tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## 🚀 Quick Start

### 1. Initialize the Container

```typescript
// main.tsx
import "reflect-metadata";
import { Container, ContainerProvider } from "@abdokouta/react-di";
import { AppModule } from "./modules/app.module";

// Initialize BEFORE React renders
Container
  .configure()
  .withModule(AppModule)
  .withLogLevel(import.meta.env.DEV ? "debug" : "info")
  .withDefaultScope("Singleton")
  .build();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContainerProvider>
    <App />
  </ContainerProvider>
);
```

### 2. Create Services

```typescript
// services/logger.service.ts
import { Injectable } from "@abdokouta/react-di";

@Injectable()
export class LoggerService {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}
```

```typescript
// services/user.service.ts
import { Injectable, Inject } from "@abdokouta/react-di";
import { LoggerService } from "./logger.service";

export const USER_SERVICE = Symbol.for("UserService");

@Injectable()
export class UserService {
  constructor(@Inject(LoggerService) private logger: LoggerService) {}

  getUsers() {
    this.logger.log("Fetching users...");
    return [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
  }
}
```

### 3. Create Modules

```typescript
// modules/app.module.ts
import { Module } from "@abdokouta/react-di";
import { LoggerService } from "../services/logger.service";
import { UserService, USER_SERVICE } from "../services/user.service";

@Module({
  providers: [LoggerService, { provide: USER_SERVICE, useClass: UserService }],
})
export class AppModule {}
```

### 4. Use in Components

```typescript
// components/UserList.tsx
import { useInject } from "@abdokouta/react-di";
import { UserService, USER_SERVICE } from "../services/user.service";

export function UserList() {
  const userService = useInject<UserService>(USER_SERVICE);
  const users = userService.getUsers();

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## 🏗️ Container Builder API

The `Container` class provides a fluent builder API for initialization:

```typescript
import { Container } from "@abdokouta/react-di";

// Full configuration
Container.configure()
  .withModule(AppModule)
  .withLogLevel("debug") // "none" | "info" | "debug"
  .withDefaultScope("Singleton") // "Singleton" | "Transient" | "Request"
  .build();

// With config object
Container.configure()
  .withModule(AppModule)
  .withConfig({
    logLevel: "debug",
    defaultScope: "Singleton",
  })
  .build();

// With defaults (logLevel: "info", defaultScope: "Singleton")
Container.configure().withModule(AppModule).withDefaults().build();

// Development defaults (logLevel: "debug")
Container.configure().withModule(AppModule).withDevDefaults().build();
```

## 🌍 Global Modules

Make services available everywhere without importing:

```typescript
import { Module, Global } from "@abdokouta/react-di";

@Global()
@Module({
  providers: [LoggerService],
})
export class LoggerModule {}

// Now LoggerService is available in ALL modules
@Module({
  imports: [LoggerModule],
})
export class AppModule {}
```

## 🔄 Dynamic Modules

Create configurable modules with `forRoot` and `forFeature`:

```typescript
import { Module, forRoot, type DynamicModule } from "@abdokouta/react-di";

export const CONFIG = Symbol.for("Config");

@Module({})
export class ConfigModule {
  static forRoot(config: AppConfig): DynamicModule {
    return forRoot(ConfigModule, {
      providers: [{ provide: CONFIG, useValue: config }, ConfigService],
      exports: [ConfigService],
    });
  }
}

// Usage
@Module({
  imports: [
    ConfigModule.forRoot({
      apiUrl: "https://api.example.com",
      debug: true,
    }),
  ],
})
export class AppModule {}
```

## 📋 Provider Types

### Class Provider

```typescript
{ provide: UserService, useClass: UserService }
// or simply
UserService
```

### Value Provider

```typescript
{ provide: API_URL, useValue: "https://api.example.com" }
```

### Factory Provider

```typescript
{
  provide: CONNECTION,
  useFactory: (context) => () => createConnection(),
}
```

### Async Factory Provider

```typescript
{
  provide: DATABASE,
  useAsyncFactory: () => async () => {
    return await connectToDatabase();
  },
}
```

### Alias Provider

```typescript
{ provide: "Logger", useExisting: LoggerService }
```

## 🎣 React Hooks

### useInject

```typescript
const service = useInject<UserService>(USER_SERVICE);
```

### useContainer

```typescript
const { container, moduleClass } = useContainer();
```

### useModule

```typescript
const container = useModule(AppModule);
```

## 🔧 Decorators

| Decorator             | Description                                      |
| --------------------- | ------------------------------------------------ |
| `@Module()`           | Define a module with providers, imports, exports |
| `@Global()`           | Make module's providers globally available       |
| `@Injectable()`       | Mark a class as injectable                       |
| `@Inject(token)`      | Inject a dependency                              |
| `@MultiInject(token)` | Inject all providers with the same token         |
| `@Optional()`         | Mark dependency as optional                      |

## ⚙️ Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strictPropertyInitialization": false
  }
}
```

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-transform-class-properties", { loose: true }],
        ],
      },
    }),
  ],
});
```

## 🔥 HMR Support

This library fully supports Vite's Hot Module Replacement. The key is to initialize the container **outside** of React's lifecycle:

```typescript
// ✅ Correct - Initialize before React
Container.configure().withModule(AppModule).build();

ReactDOM.createRoot(root).render(<App />);
```

```typescript
// ❌ Wrong - Don't initialize inside components
function App() {
  Container.configure().withModule(AppModule).build(); // This breaks HMR!
}
```

## 📚 Examples

Check out the [examples](./examples) directory for complete working examples:

- [Vite + React](./examples/vite) - Full-featured example with all patterns

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Abdo Kouta](https://github.com/abdokouta)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/abdokouta">Abdo Kouta</a>
</p>
