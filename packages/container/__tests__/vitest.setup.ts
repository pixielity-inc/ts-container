/**
 * @fileoverview Vitest setup file for @abdokouta/react-di package
 *
 * This file configures the testing environment before running tests. It runs
 * automatically before any test files are executed, setting up mocks, global
 * configurations, and test utilities.
 *
 * Setup Features:
 * - Mock @abdokouta/react-di decorators for isolated testing
 * - Clear mocks before each test for test isolation
 * - Reset mocks after each test for cleanup
 * - Provide consistent test environment across all test files
 *
 * Why Mock Decorators?
 * The decorators (@Injectable, @Inject, @Module) are mocked to allow testing
 * without requiring the full DI container setup. This enables:
 * - Faster test execution
 * - Isolated unit tests
 * - Testing decorator behavior independently
 * - Avoiding complex container initialization in simple tests
 *
 * @module @abdokouta/react-di
 * @category Configuration
 * @see {@link https://vitest.dev/config/#setupfiles} - Vitest setup files documentation
 */

import { beforeEach, afterEach, vi } from "vitest";

/**
 * Mock @abdokouta/react-di decorators
 *
 * This mock ensures that Injectable, Inject, Module, and other decorators
 * work in tests without requiring the full DI container setup. The mocks
 * are simple pass-through implementations that preserve class structure
 * while avoiding the complexity of actual dependency injection.
 *
 * Mocked Decorators:
 * - Injectable: Returns the target class unchanged
 * - Inject: No-op parameter decorator
 * - Module: Returns the target class unchanged
 * - forRoot: Returns the config object unchanged
 *
 * Usage in Tests:
 * ```typescript
 * // These decorators will use the mocked versions
 * @Injectable()
 * class TestService {}
 *
 * @Module({ providers: [TestService] })
 * class TestModule {}
 * ```
 *
 * Note: For integration tests that require actual DI functionality,
 * you may need to unmock these decorators using vi.unmock()
 */
vi.mock("@abdokouta/react-di", () => ({
  // Mock Injectable decorator - returns class unchanged
  Injectable: () => (target: any) => target,

  // Mock Inject decorator - no-op parameter decorator
  Inject:
    () => (_target: any, _propertyKey: string, _parameterIndex: number) => {},

  // Mock Module decorator - returns class unchanged
  Module: () => (target: any) => target,

  // Mock forRoot helper - returns config unchanged
  forRoot: (_module: any, config: any) => config,
}));

/**
 * Setup before each test
 *
 * This hook runs before every individual test case, ensuring each test
 * starts with a clean slate. Clearing mocks prevents test pollution where
 * one test's mock calls affect another test's assertions.
 *
 * What it does:
 * - Clears all mock call history
 * - Resets mock implementation counts
 * - Ensures test isolation
 *
 * Example:
 * ```typescript
 * it('test 1', () => {
 *   const spy = vi.fn();
 *   spy();
 *   expect(spy).toHaveBeenCalledTimes(1);
 * });
 *
 * it('test 2', () => {
 *   // spy is cleared, starts fresh
 *   const spy = vi.fn();
 *   expect(spy).toHaveBeenCalledTimes(0);
 * });
 * ```
 */
beforeEach(() => {
  // Clear all mocks before each test
  // This removes call history but preserves mock implementations
  vi.clearAllMocks();
});

/**
 * Cleanup after each test
 *
 * This hook runs after every individual test case, performing cleanup
 * to ensure no test state leaks into subsequent tests. Resetting mocks
 * is more thorough than clearing - it also resets implementations.
 *
 * What it does:
 * - Resets all mock implementations to their initial state
 * - Clears all mock call history
 * - Removes any mock return values or implementations set during tests
 *
 * Difference from clearAllMocks:
 * - clearAllMocks: Clears call history only
 * - resetAllMocks: Clears call history AND resets implementations
 *
 * Example:
 * ```typescript
 * it('test with custom implementation', () => {
 *   const spy = vi.fn().mockReturnValue(42);
 *   expect(spy()).toBe(42);
 * });
 *
 * it('next test', () => {
 *   // spy implementation is reset, no longer returns 42
 *   const spy = vi.fn();
 *   expect(spy()).toBeUndefined();
 * });
 * ```
 */
afterEach(() => {
  // Reset all mocks after each test
  // This clears history AND resets implementations
  vi.resetAllMocks();
});
