/**
 * Basic Usage Example
 *
 * This example demonstrates the basic usage of @abdokouta/react-di
 */

import { useEffect } from "react";
import {
  Module,
  Injectable,
  Inject,
  ContainerProvider,
  useInject,
} from "../src/index";

// 1. Define services
@Injectable()
class Logger {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}

@Injectable()
class UserService {
  constructor(@Inject(Logger) private logger: Logger) {}

  getUsers() {
    this.logger.log("Fetching users...");
    return ["Alice", "Bob", "Charlie"];
  }
}

// 2. Create a module
@Module({
  providers: [Logger, UserService],
  exports: [UserService],
})
class UserModule {}

// 3. Create root module
@Module({
  imports: [UserModule],
})
class AppModule {}

// 4. Use in React components
function UserList() {
  const userService = useInject(UserService);
  const users = userService.getUsers();

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user: string) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

// 5. Wrap with ContainerProvider
export function App() {
  return (
    <ContainerProvider
      module={AppModule}
      options={{
        logLevel: "debug",
        defaultScope: "Singleton",
      }}
    >
      <UserList />
    </ContainerProvider>
  );
}
