import { describe, it, expect } from 'vitest';
import {
  type OnModuleInit,
  type OnModuleDestroy,
  hasOnModuleInit,
  hasOnModuleDestroy,
} from '../../src/interfaces/lifecycle.interface';

describe('Lifecycle Interfaces', () => {
  describe('OnModuleInit', () => {
    it('should define onModuleInit method', () => {
      class TestService implements OnModuleInit {
        onModuleInit(): void {
          // Implementation
        }
      }

      const service = new TestService();
      expect(typeof service.onModuleInit).toBe('function');
    });

    it('should support async onModuleInit', async () => {
      class TestService implements OnModuleInit {
        initialized = false;

        async onModuleInit(): Promise<void> {
          await new Promise((resolve) => setTimeout(resolve, 10));
          this.initialized = true;
        }
      }

      const service = new TestService();
      await service.onModuleInit();
      expect(service.initialized).toBe(true);
    });
  });

  describe('OnModuleDestroy', () => {
    it('should define onModuleDestroy method', () => {
      class TestService implements OnModuleDestroy {
        onModuleDestroy(): void {
          // Implementation
        }
      }

      const service = new TestService();
      expect(typeof service.onModuleDestroy).toBe('function');
    });

    it('should support async onModuleDestroy', async () => {
      class TestService implements OnModuleDestroy {
        destroyed = false;

        async onModuleDestroy(): Promise<void> {
          await new Promise((resolve) => setTimeout(resolve, 10));
          this.destroyed = true;
        }
      }

      const service = new TestService();
      await service.onModuleDestroy();
      expect(service.destroyed).toBe(true);
    });
  });

  describe('Type Guards', () => {
    describe('hasOnModuleInit', () => {
      it('should return true for objects with onModuleInit method', () => {
        const obj = {
          onModuleInit: () => {},
        };

        expect(hasOnModuleInit(obj)).toBe(true);
      });

      it('should return false for objects without onModuleInit method', () => {
        const obj = {};
        expect(hasOnModuleInit(obj)).toBe(false);
      });

      it('should return false for null/undefined', () => {
        expect(hasOnModuleInit(null)).toBe(false);
        expect(hasOnModuleInit(undefined)).toBe(false);
      });
    });

    describe('hasOnModuleDestroy', () => {
      it('should return true for objects with onModuleDestroy method', () => {
        const obj = {
          onModuleDestroy: () => {},
        };

        expect(hasOnModuleDestroy(obj)).toBe(true);
      });

      it('should return false for objects without onModuleDestroy method', () => {
        const obj = {};
        expect(hasOnModuleDestroy(obj)).toBe(false);
      });

      it('should return false for null/undefined', () => {
        expect(hasOnModuleDestroy(null)).toBe(false);
        expect(hasOnModuleDestroy(undefined)).toBe(false);
      });
    });
  });

  describe('Combined Usage', () => {
    it('should support both interfaces on same class', () => {
      class TestService implements OnModuleInit, OnModuleDestroy {
        initialized = false;
        destroyed = false;

        onModuleInit(): void {
          this.initialized = true;
        }

        onModuleDestroy(): void {
          this.destroyed = true;
        }
      }

      const service = new TestService();
      
      expect(hasOnModuleInit(service)).toBe(true);
      expect(hasOnModuleDestroy(service)).toBe(true);

      service.onModuleInit();
      expect(service.initialized).toBe(true);

      service.onModuleDestroy();
      expect(service.destroyed).toBe(true);
    });
  });
});
