/**
 * Dynamic Module Example
 *
 * This example demonstrates how to create configurable modules
 * using the forRoot pattern
 */

import {
  Module,
  Injectable,
  Inject,
  forRoot,
  useInject,
  ContainerProvider,
  type DynamicModule,
} from "@abdokouta/react-di";

// 1. Define configuration token
export const DATABASE_CONFIG = Symbol("DATABASE_CONFIG");

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
}

// 2. Create service that uses configuration
@Injectable()
class DatabaseService {
  constructor(@Inject(DATABASE_CONFIG) private config: DatabaseConfig) {}

  connect() {
    console.log(`Connecting to ${this.config.host}:${this.config.port}/${this.config.database}`);
    return `Connected to ${this.config.database}`;
  }
}

// 3. Create dynamic module
@Module({})
class DatabaseModule {
  static forRoot(config: DatabaseConfig): DynamicModule {
    return forRoot(DatabaseModule, {
      providers: [
        {
          provide: DATABASE_CONFIG,
          useValue: config,
        },
        DatabaseService,
      ],
      exports: [DatabaseService],
    });
  }
}

// 4. Use in root module
@Module({
  imports: [
    DatabaseModule.forRoot({
      host: "localhost",
      port: 5432,
      database: "myapp",
    }),
  ],
})
class AppModule {}

// 5. Use in components with ContainerProvider
function DatabaseStatus() {
  const dbService = useInject(DatabaseService);
  const status = dbService.connect();

  return <div>Database Status: {status}</div>;
}

export function App() {
  return (
    <ContainerProvider
      module={AppModule}
      options={{
        logLevel: "debug",
        defaultScope: "Singleton",
      }}
    >
      <DatabaseStatus />
    </ContainerProvider>
  );
}
