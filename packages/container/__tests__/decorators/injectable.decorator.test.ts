/**
 * @fileoverview Tests for Injectable decorator
 *
 * This comprehensive test suite verifies the @Injectable() decorator functionality,
 * which marks classes as injectable dependencies in the DI container. The decorator
 * is a fundamental building block that enables classes to be registered and resolved
 * by the dependency injection system.
 *
 * Test Coverage:
 * - Class decoration and basic functionality
 * - Multiple decorated classes working independently
 * - Preservation of class methods and properties
 * - Constructor parameter handling
 * - Class inheritance scenarios
 * - Edge cases (empty classes, static methods)
 *
 * The @Injectable() decorator wraps Inversiland's injectable decorator and provides
 * the foundation for dependency injection in React applications. It uses reflect-metadata
 * to store type information that enables automatic dependency resolution.
 *
 * @module @abdokouta/react-di
 * @category Tests
 * @see {@link Injectable} - The decorator being tested
 * @see {@link https://github.com/inversiland/inversiland} - Underlying DI framework
 */

import { describe, it, expect } from "vitest";
import { Injectable } from "@/decorators/injectable.decorator";
import "reflect-metadata";

/**
 * Test Suite: Injectable Decorator
 *
 * Tests the @Injectable() decorator which marks classes as injectable dependencies.
 * This decorator is essential for enabling dependency injection in the container system.
 */
describe("Injectable Decorator", () => {
  /**
   * Test Group: Class Decoration
   *
   * Verifies that the @Injectable() decorator properly decorates classes without
   * interfering with their normal functionality. Tests ensure that decorated classes
   * maintain their methods, properties, and behavior while being registered in the
   * DI container.
   */
  describe("Class Decoration", () => {
    /**
     * Test: Basic class decoration
     *
     * Verifies that a class can be decorated with @Injectable() and that the
     * decoration doesn't interfere with basic class instantiation and method calls.
     *
     * Expected Behavior:
     * - Class should be defined after decoration
     * - Instance methods should work correctly
     * - Class functionality should remain unchanged
     */
    it("should decorate a class", () => {
      // Arrange & Act: Apply @Injectable() decorator to a simple service class
      // The decorator should register the class with the DI container without
      // modifying its runtime behavior
      @Injectable()
      class TestService {
        getValue() {
          return "test";
        }
      }

      // Assert: Verify the class is properly defined and functional
      // The decorator should not prevent normal class usage
      expect(TestService).toBeDefined();
      expect(new TestService().getValue()).toBe("test");
    });

    /**
     * Test: Multiple decorated classes
     *
     * Ensures that multiple classes can be decorated with @Injectable() independently
     * without interfering with each other. This is crucial for a DI system where
     * many services need to be registered simultaneously.
     *
     * Expected Behavior:
     * - Each decorated class should maintain its own identity
     * - Classes should not share state or interfere with each other
     * - Each class should be independently instantiable
     */
    it("should allow multiple decorated classes", () => {
      // Arrange & Act: Decorate two separate service classes
      // Each should be registered independently in the DI container
      @Injectable()
      class ServiceA {
        name = "A";
      }

      @Injectable()
      class ServiceB {
        name = "B";
      }

      // Assert: Verify both classes work independently with their own state
      // This confirms that the decorator doesn't create shared state between classes
      expect(new ServiceA().name).toBe("A");
      expect(new ServiceB().name).toBe("B");
    });

    /**
     * Test: Method preservation
     *
     * Verifies that the @Injectable() decorator preserves all class methods,
     * including getters, setters, and methods that access private state.
     * The decorator should be transparent to the class's internal implementation.
     *
     * Expected Behavior:
     * - All methods should remain functional
     * - Private state should be accessible to methods
     * - Method behavior should be unchanged
     */
    it("should preserve class methods", () => {
      // Arrange & Act: Create a service with multiple methods and private state
      // The decorator should not interfere with method definitions or access to private members
      @Injectable()
      class TestService {
        private value = 42;

        getValue() {
          return this.value;
        }

        setValue(val: number) {
          this.value = val;
        }
      }

      // Assert: Verify all methods work correctly and can access private state
      // This ensures the decorator doesn't break encapsulation
      const service = new TestService();
      expect(service.getValue()).toBe(42);
      service.setValue(100);
      expect(service.getValue()).toBe(100);
    });

    /**
     * Test: Property preservation
     *
     * Ensures that class properties (both public and private) are preserved
     * after decoration. Properties should maintain their visibility modifiers
     * and initial values.
     *
     * Expected Behavior:
     * - Public properties should remain accessible
     * - Private properties should remain encapsulated
     * - Property initialization should work correctly
     */
    it("should preserve class properties", () => {
      // Arrange & Act: Create a service with both public and private properties
      // The decorator should preserve property definitions and access modifiers
      @Injectable()
      class TestService {
        public name = "test";
        private count = 0;

        increment() {
          this.count++;
          return this.count;
        }
      }

      // Assert: Verify properties are accessible and maintain their state correctly
      // Public properties should be readable, private properties should work through methods
      const service = new TestService();
      expect(service.name).toBe("test");
      expect(service.increment()).toBe(1);
      expect(service.increment()).toBe(2);
    });
  });

  /**
   * Test Group: Constructor Parameters
   *
   * Tests how the @Injectable() decorator handles classes with different
   * constructor signatures. This is important because the DI container needs
   * to understand constructor dependencies to perform automatic injection.
   */
  describe("Constructor Parameters", () => {
    /**
     * Test: Classes without constructor parameters
     *
     * Verifies that classes with no constructor or an empty constructor
     * can be decorated and instantiated without issues.
     *
     * Expected Behavior:
     * - Class should be instantiable without arguments
     * - No errors should occur during decoration or instantiation
     */
    it("should handle classes with no constructor parameters", () => {
      // Arrange & Act: Decorate a simple class with no constructor
      // This is the simplest case for dependency injection
      @Injectable()
      class SimpleService {}

      // Assert: Verify the class can be instantiated
      // The DI container should handle parameterless constructors easily
      expect(new SimpleService()).toBeDefined();
    });

    /**
     * Test: Classes with constructor parameters
     *
     * Ensures that classes with constructor parameters can be decorated
     * and that the decorator doesn't interfere with parameter passing.
     * While the DI container will inject dependencies automatically,
     * manual instantiation should still work.
     *
     * Expected Behavior:
     * - Constructor parameters should be accepted
     * - Parameters should be accessible within the class
     * - Manual instantiation should work alongside DI
     */
    it("should handle classes with constructor parameters", () => {
      // Arrange & Act: Decorate a class that requires constructor parameters
      // The decorator should preserve the constructor signature
      @Injectable()
      class ServiceWithDeps {
        constructor(private config: { value: number }) {}

        getValue() {
          return this.config.value;
        }
      }

      // Assert: Verify the class can be instantiated with parameters
      // This confirms the decorator doesn't break constructor parameter handling
      const service = new ServiceWithDeps({ value: 42 });
      expect(service.getValue()).toBe(42);
    });
  });

  /**
   * Test Group: Inheritance
   *
   * Tests how the @Injectable() decorator works with class inheritance.
   * Both base and derived classes should be decoratable, and inheritance
   * chains should work correctly with the DI system.
   */
  describe("Inheritance", () => {
    /**
     * Test: Class inheritance with decorated classes
     *
     * Verifies that both base and derived classes can be decorated with
     * @Injectable() and that the inheritance chain remains functional.
     * This is important for creating hierarchies of services.
     *
     * Expected Behavior:
     * - Both base and derived classes should be decoratable
     * - Derived classes should inherit base class methods
     * - Both inherited and own methods should work correctly
     */
    it("should work with class inheritance", () => {
      // Arrange: Create a base service and a derived service
      // Both are decorated to be injectable in the DI container
      @Injectable()
      class BaseService {
        baseMethod() {
          return "base";
        }
      }

      @Injectable()
      class DerivedService extends BaseService {
        derivedMethod() {
          return "derived";
        }
      }

      // Act: Instantiate the derived service
      const service = new DerivedService();

      // Assert: Verify both inherited and own methods work
      // This confirms the decorator doesn't break the prototype chain
      expect(service.baseMethod()).toBe("base");
      expect(service.derivedMethod()).toBe("derived");
    });
  });

  /**
   * Test Group: Edge Cases
   *
   * Tests unusual but valid scenarios to ensure the decorator is robust
   * and handles edge cases gracefully. These tests verify behavior with
   * minimal classes, static members, and other special cases.
   */
  describe("Edge Cases", () => {
    /**
     * Test: Empty classes
     *
     * Verifies that completely empty classes (no properties, no methods)
     * can be decorated and instantiated. While not common in practice,
     * this ensures the decorator doesn't require any minimum class structure.
     *
     * Expected Behavior:
     * - Empty classes should be decoratable
     * - Instantiation should succeed
     * - No runtime errors should occur
     */
    it("should handle empty classes", () => {
      // Arrange & Act: Decorate a class with no members
      // This is the absolute minimum valid class definition
      @Injectable()
      class EmptyService {}

      // Assert: Verify the empty class can be instantiated
      // The decorator should work even with minimal class definitions
      expect(new EmptyService()).toBeDefined();
    });

    /**
     * Test: Classes with static methods
     *
     * Ensures that classes with static methods can be decorated and that
     * both static and instance methods remain functional. Static methods
     * are not injected but should not interfere with the decorator.
     *
     * Expected Behavior:
     * - Static methods should remain callable on the class
     * - Instance methods should work on instances
     * - No interference between static and instance members
     */
    it("should handle classes with static methods", () => {
      // Arrange & Act: Decorate a class with both static and instance methods
      // Static methods belong to the class, instance methods to instances
      @Injectable()
      class ServiceWithStatic {
        static staticMethod() {
          return "static";
        }

        instanceMethod() {
          return "instance";
        }
      }

      // Assert: Verify both static and instance methods work correctly
      // The decorator should not affect static members
      expect(ServiceWithStatic.staticMethod()).toBe("static");
      expect(new ServiceWithStatic().instanceMethod()).toBe("instance");
    });
  });
});
