/**
 * Container
 *
 * Fluent builder pattern for configuring and initializing the DI container.
 * This MUST be called in your entry point (main.tsx/index.tsx) BEFORE ReactDOM.createRoot().
 *
 * @module container
 */

import { Inversiland, getModuleContainer } from "inversiland";
import type { Newable, ModuleContainer } from "inversiland";

import type { LogLevel, Scope } from "./types";
import type { IContainerConfig } from "./interfaces/container-config.interface";

/**
 * Container
 *
 * Provides a fluent API for configuring and initializing the DI container.
 *
 * @example
 * ```typescript
 * // main.tsx
 * import "reflect-metadata";
 * import { Container, ContainerProvider } from "@abdokouta/react-di";
 * import { Facade } from "@abdokouta/react-support";
 * import { AppModule } from "./modules/app.module";
 *
 * Container
 *   .configure()
 *   .withModule(AppModule)
 *   .withDefaults()
 *   .build();
 *
 * // Configure facades (optional)
 * Facade.setFacadeContainer(Container.getContainer());
 *
 * ReactDOM.createRoot(document.getElementById("root")!).render(
 *   <ContainerProvider module={AppModule}>
 *     <App />
 *   </ContainerProvider>
 * );
 * ```
 */
export class Container {
  private static _module: Newable | null = null;
  private static _container: ModuleContainer | null = null;
  private static _config: Partial<IContainerConfig> = {};

  /**
   * Start configuring the container
   *
   * @returns The Container class for chaining
   */
  static configure(): typeof Container {
    this._module = null;
    this._container = null;
    this._config = {};
    return this;
  }

  /**
   * Set the root module for the container
   *
   * @param module - The root module class decorated with @Module()
   * @returns The Container class for chaining
   */
  static withModule(module: Newable): typeof Container {
    this._module = module;
    return this;
  }

  /**
   * Set the log level for container operations
   *
   * @param level - The log level: "none" | "info" | "debug"
   * @returns The Container class for chaining
   */
  static withLogLevel(level: LogLevel): typeof Container {
    this._config.logLevel = level;
    return this;
  }

  /**
   * Set the default scope for providers
   *
   * @param scope - The default scope: "Singleton" | "Transient" | "Request"
   * @returns The Container class for chaining
   */
  static withDefaultScope(scope: Scope): typeof Container {
    this._config.defaultScope = scope;
    return this;
  }

  /**
   * Apply the full configuration object
   *
   * @param config - The container configuration
   * @returns The Container class for chaining
   */
  static withConfig(config: Partial<IContainerConfig>): typeof Container {
    this._config = { ...this._config, ...config };
    return this;
  }

  /**
   * Apply default configuration (logLevel: "info", defaultScope: "Singleton")
   *
   * @returns The Container class for chaining
   */
  static withDefaults(): typeof Container {
    this._config = {
      logLevel: "info",
      defaultScope: "Singleton",
    };
    return this;
  }

  /**
   * Apply development defaults (logLevel: "debug", defaultScope: "Singleton")
   *
   * @returns The Container class for chaining
   */
  static withDevDefaults(): typeof Container {
    this._config = {
      logLevel: "debug",
      defaultScope: "Singleton",
    };
    return this;
  }

  /**
   * Build and initialize the container
   *
   * This method MUST be called ONCE in your entry point (main.tsx/index.tsx)
   * BEFORE React renders.
   *
   * @throws Error if no module has been configured
   */
  static build(): void {
    if (!this._module) {
      throw new Error(
        "[Container] No module configured. Call .withModule(YourModule) before .build()"
      );
    }

    // Apply configuration to Inversiland
    if (this._config.logLevel) {
      Inversiland.options.logLevel = this._config.logLevel;
    }
    if (this._config.defaultScope) {
      Inversiland.options.defaultScope = this._config.defaultScope;
    }

    // Initialize the container
    Inversiland.run(this._module);

    // Get and cache the container
    this._container = getModuleContainer(this._module);
  }

  /**
   * Get the module container instance
   *
   * @returns The module container or null if not built
   */
  static getContainer(): ModuleContainer | null {
    return this._container;
  }

  /**
   * Get the root module class
   *
   * @returns The module class or null if not configured
   */
  static getModule(): Newable | null {
    return this._module;
  }
}
