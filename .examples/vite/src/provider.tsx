import { ContainerProvider } from "@abdokouta/react-di";

import { AppModule } from "@/modules/app.module";
import { containerConfig } from "@/config/container.config";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ContainerProvider module={AppModule} options={containerConfig}>
      {children}
    </ContainerProvider>
  );
}
