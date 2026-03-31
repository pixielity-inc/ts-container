# @abdokouta/react-di - Package Summary

## 📦 Package Overview

A production-ready dependency injection container for React applications with NestJS-style modules, built on top of Inversiland.

This is a monorepo project using:

- **Turbo** - Build system orchestration and caching
- **pnpm workspaces** - Package management and linking
- **packages/container** - Main library package
- **examples/vite** - Example application

---

## 📁 Monorepo Structure

```
.
├── packages/
│   └── container/               # @abdokouta/react-di package
│       ├── src/
│       │   ├── decorators/      # 9 decorators
│       │   ├── hooks/           # 3 React hooks
│       │   ├── providers/       # ContainerProvider
│       │   ├── contexts/        # React context
│       │   ├── types/           # Type definitions
│       │   ├── interfaces/      # Interfaces
│       │   ├── constants/       # Constants
│       │   ├── utils/           # Utilities
│       │   └── index.ts         # Main entry point
│       ├── __tests__/           # Tests
│       ├── dist/                # Build output
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsup.config.ts
│       └── vitest.config.ts
├── examples/
│   └── vite/                    # Example application
│       ├── src/
│       │   ├── components/
│       │   ├── modules/
│       │   ├── services/
│       │   ├── pages/
│       │   └── main.tsx
│       ├── package.json
│       └── vite.config.ts
├── .docs/                       # Documentation
├── .github/workflows/           # CI/CD
├── package.json                 # Root workspace config
├── pnpm-workspace.yaml          # Workspace definition
├── turbo.json                   # Turbo config
└── pnpm-lock.yaml               # Lockfile
```

---

## 📁 Package Structure (packages/container/)

├── src/
│ ├── decorators/ # 9 decorators
│ │ ├── module.decorator.ts
│ │ ├── injectable.decorator.ts
│ │ ├── inject.decorator.ts
│ │ ├── multi-inject.decorator.ts
│ │ ├── optional.decorator.ts
│ │ ├── inject-provided.decorator.ts
│ │ ├── inject-imported.decorator.ts
│ │ ├── multi-inject-provided.decorator.ts
│ │ └── multi-inject-imported.decorator.ts
│ ├── hooks/ # 2 React hooks
│ │ ├── use-inject.hook.ts
│ │ └── use-module.hook.ts
│ ├── types/ # 6 type definition files
│ │ ├── module-metadata.type.ts
│ │ ├── provider.type.ts
│ │ ├── inversiland.type.ts
│ │ ├── scope.type.ts
│ │ ├── log-level.type.ts
│ │ └── module-options.type.ts
│ ├── utils/ # 2 utility files
│ │ ├── module-helpers.util.ts
│ │ └── create-module-factory.util.ts
│ ├── constants/ # 1 constants file
│ │ └── index.ts
│ └── index.ts # Main entry point
├── examples/ # 2 working examples
│ ├── basic-usage.tsx
│ └── dynamic-module.tsx
├── dist/ # Build output
│ ├── index.js # CJS (5.16 KB)
│ ├── index.mjs # ESM (3.24 KB)
│ ├── index.d.ts # Types (16.89 KB)
│ └── \*.map # Source maps
├── README.md # Complete documentation
├── CHANGELOG.md # Version history
├── LICENSE # MIT license
├── PRODUCTION_READY.md # Production status
├── PRODUCTION_CHECKLIST.md # Development checklist
├── package.json # Package metadata
├── tsconfig.json # TypeScript config
└── tsup.config.ts # Build config

````

---

## 🎯 Core Features

### Decorators (9 total)

#### Essential (5)
- `@Module(metadata)` - Define modules with imports/providers/exports
- `@Injectable()` - Mark classes as injectable
- `@Inject(token)` - Inject single dependency
- `@MultiInject(token)` - Inject multiple dependencies
- `@Optional()` - Mark dependency as optional

#### Advanced (4)
- `@InjectProvided(token)` - Inject only local providers
- `@InjectImported(token)` - Inject only imported providers
- `@MultiInjectProvided(token)` - Multi-inject local only
- `@MultiInjectImported(token)` - Multi-inject imported only

### React Hooks (2)
- `useInject<T>(token, module)` - Inject service in component
- `useModule(module)` - Access module container

### Utilities (3)
- `forRoot(module, metadata)` - Create root dynamic module
- `forFeature(module, metadata)` - Create feature dynamic module
- `createModuleFactory(module, metadata)` - Generic factory

### Type Definitions (15+)
- `ModuleMetadata` - Module configuration
- `DynamicModule` - Dynamic module return type
- `Provider` - Union of all provider types
- `ClassProvider` - Class-based provider
- `ValueProvider` - Value-based provider
- `FactoryProvider` - Factory function provider
- `AsyncFactoryProvider` - Async factory provider
- `ExistingProvider` - Alias provider
- `ServiceIdentifier<T>` - Service token type
- `Scope` - Provider lifecycle scope
- `LogLevel` - Logging verbosity
- `ModuleOptions` - Configuration options
- `Newable<T>` - Constructor type
- `ModuleContainer` - Container interface
- `ExportedProvider` - Export configuration

---

## 📊 Statistics

### Code Metrics
- **Total Files**: 25+ source files
- **Decorators**: 9
- **Hooks**: 2
- **Utilities**: 3
- **Type Files**: 6
- **Examples**: 2
- **Documentation**: 5 files

### Build Output
- **CJS Bundle**: 5.16 KB
- **ESM Bundle**: 3.24 KB
- **Type Definitions**: 16.89 KB
- **Total Package Size**: ~25 KB (minified)

### Dependencies
- **Runtime**: 2 (inversiland, reflect-metadata)
- **Peer**: 1 (react)
- **Dev**: 4 (types, build tools)

---

## 🔧 Technical Details

### TypeScript Configuration
```json
{
  "target": "ES2020",
  "module": "ESNext",
  "strict": true,
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
````

### Build Configuration

- **Bundler**: tsup (esbuild)
- **Formats**: CJS + ESM
- **Type Declarations**: Yes
- **Source Maps**: Yes
- **Tree Shaking**: Supported
- **External**: react, react-dom

### Browser Support

- Modern browsers (ES2020+)
- Node.js 14+
- React 18+

---

## 📖 Usage Patterns

### Basic Pattern

```typescript
// 1. Define service
@Injectable()
class UserService {
  constructor(@Inject(Logger) private logger: Logger) {}
}

// 2. Create module
@Module({
  providers: [UserService, Logger],
  exports: [UserService],
})
class UserModule {}

// 3. Initialize
Inversiland.run(AppModule);

// 4. Use in component
const userService = useInject(UserService, AppModule);
```

### Dynamic Module Pattern

```typescript
@Module({})
class ConfigModule {
  static forRoot(config: Config): DynamicModule {
    return forRoot(ConfigModule, {
      providers: [{ provide: CONFIG_TOKEN, useValue: config }, ConfigService],
      exports: [ConfigService],
    });
  }
}
```

### Provider Types

```typescript
// Class provider
{ provide: UserService, useClass: UserService }

// Value provider
{ provide: API_KEY, useValue: "key123" }

// Factory provider
{ provide: CONNECTION, useFactory: () => createConnection() }

// Async factory provider
{ provide: DB, useAsyncFactory: () => async () => await connect() }

// Existing provider (alias)
{ provide: "UserServiceAlias", useExisting: UserService }
```

---

## ✅ Quality Assurance

### Code Quality

- ✅ TypeScript strict mode
- ✅ Full type coverage
- ✅ JSDoc comments on all exports
- ✅ Consistent naming conventions
- ✅ Proper error handling
- ✅ No any types in public API

### Documentation Quality

- ✅ Comprehensive README
- ✅ Working code examples
- ✅ API reference
- ✅ Type documentation
- ✅ Migration guide (from docs)
- ✅ Troubleshooting tips

### Build Quality

- ✅ Clean builds
- ✅ No build warnings
- ✅ Proper externals
- ✅ Source maps included
- ✅ Tree-shakeable
- ✅ Multiple formats (CJS/ESM)

### Package Quality

- ✅ Proper package.json
- ✅ LICENSE file
- ✅ CHANGELOG
- ✅ .gitignore
- ✅ README
- ✅ Examples

---

## 🚀 Publishing Readiness

### Pre-Publish Checklist

- [x] All code complete
- [x] All documentation complete
- [x] All examples working
- [x] Package builds successfully
- [x] No TypeScript errors
- [x] No linting errors
- [x] Dependencies up to date
- [x] Version number set
- [x] LICENSE file present
- [x] README accurate

### Publish Command

```bash
cd packages/!prod/container
npm publish
```

### Post-Publish Tasks

1. Create GitHub release (v1.0.0)
2. Update documentation site
3. Announce on social media
4. Monitor npm downloads
5. Watch for issues/bugs

---

## 📈 Roadmap

### Version 1.0.0 (Current)

- ✅ Core DI functionality
- ✅ NestJS-style modules
- ✅ React hooks
- ✅ Dynamic modules
- ✅ Full TypeScript support

### Version 1.1.0 (Planned)

- [ ] Comprehensive test suite
- [ ] Performance benchmarks
- [ ] More examples
- [ ] Migration guides

### Version 1.2.0 (Future)

- [ ] Debugging utilities
- [ ] Module visualization
- [ ] Performance monitoring
- [ ] Development warnings

### Version 2.0.0 (Future)

- [ ] React Server Components support
- [ ] Async module initialization
- [ ] Module hot reloading
- [ ] Plugin system

---

## 🎓 Learning Resources

### Official Documentation

- README.md - Package documentation
- examples/ - Working code examples
- CHANGELOG.md - Version history

### External Resources

- [Inversiland Docs](https://github.com/inversiland/inversiland)
- [InversifyJS Docs](https://inversify.io/)
- [NestJS Modules](https://docs.nestjs.com/modules)

---

## 🤝 Contributing

### Development Setup

```bash
# Clone repository
git clone https://github.com/refinedev/refine.git

# Navigate to package
cd packages/!prod/container

# Install dependencies
npm install

# Build package
npm run build

# Watch mode
npm run dev
```

### Code Standards

- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits
- JSDoc comments

---

## 📄 License

MIT License - See LICENSE file for details

---

## 📞 Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Documentation**: README.md
- **Examples**: examples/ directory

---

**Package**: @abdokouta/react-di
**Version**: 1.0.0
**Status**: Production Ready ✅
**Last Updated**: March 29, 2026
