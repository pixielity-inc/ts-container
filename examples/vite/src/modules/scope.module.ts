/**
 * Scope Module
 *
 * Demonstrates different provider scopes:
 * - `Scope.DEFAULT` (singleton) — one instance shared everywhere (the default)
 * - `Scope.TRANSIENT` — new instance created per injection point
 *
 * Each RequestService and TransientService injection gets a fresh instance
 * with its own unique ID.
 */

import { Module, Scope } from '@abdokouta/ts-container';
import { RequestService } from '@/services/request.service';
import { TransientService } from '@/services/transient.service';
import { REQUEST_SERVICE, TRANSIENT_SERVICE } from '@/constants';

@Module({
  providers: [
    {
      provide: REQUEST_SERVICE,
      useClass: RequestService,
      scope: Scope.TRANSIENT,
    },
    {
      provide: TRANSIENT_SERVICE,
      useClass: TransientService,
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [REQUEST_SERVICE, TRANSIENT_SERVICE],
})
export class ScopeModule {}
