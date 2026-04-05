/**
 * Counter Service
 *
 * Implements `OnModuleInit` to log readiness.
 * Simple example of a stateful service with pub/sub.
 */

import {
  Injectable,
  Inject,
  type OnModuleInit,
} from '@abdokouta/ts-container';
import { LOGGER_SERVICE } from '@/constants';

@Injectable()
export class CounterService implements OnModuleInit {
  private count = 0;
  private listeners: Array<(count: number) => void> = [];

  constructor(@Inject(LOGGER_SERVICE) private logger: any) {}

  onModuleInit(): void {
    this.logger.info('CounterService initialized — count starts at 0');
  }

  getCount(): number {
    return this.count;
  }

  increment(): void {
    this.count++;
    this.logger.log('Counter incremented', this.count);
    this.notifyListeners();
  }

  decrement(): void {
    this.count--;
    this.logger.log('Counter decremented', this.count);
    this.notifyListeners();
  }

  reset(): void {
    this.count = 0;
    this.logger.log('Counter reset');
    this.notifyListeners();
  }

  subscribe(listener: (count: number) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.count));
  }
}
