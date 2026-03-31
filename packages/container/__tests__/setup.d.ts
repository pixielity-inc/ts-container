/**
 * @fileoverview Type declarations for Vitest test environment
 *
 * This TypeScript declaration file extends Vitest's type definitions to include
 * custom matchers, global test utilities, and testing library types. It ensures
 * that TypeScript understands all the testing APIs available in test files.
 *
 * Purpose:
 * - Provide type safety for test utilities (describe, it, expect, etc.)
 * - Enable autocomplete for testing library matchers
 * - Extend Vitest's expect with jest-dom custom matchers
 * - Ensure TypeScript recognizes global test functions
 *
 * What's Included:
 * - Vitest globals: describe, it, expect, beforeEach, afterEach, vi, etc.
 * - Jest-DOM matchers: toBeInTheDocument, toHaveClass, toBeVisible, etc.
 * - Testing Library types: render, screen, fireEvent, waitFor, etc.
 *
 * Usage:
 * This file is automatically included by TypeScript when processing test files.
 * You don't need to import it explicitly - the types are globally available.
 *
 * Example of enabled functionality:
 * ```typescript
 * // Vitest globals work without imports
 * describe('MyComponent', () => {
 *   it('should render', () => {
 *     expect(true).toBe(true);
 *   });
 * });
 *
 * // Jest-DOM matchers are typed
 * expect(element).toBeInTheDocument();
 * expect(element).toHaveClass('active');
 * ```
 *
 * @module @abdokouta/react-di
 * @category Configuration
 * @see {@link https://vitest.dev/guide/} - Vitest documentation
 * @see {@link https://testing-library.com/docs/react-testing-library/intro/} - React Testing Library
 * @see {@link https://github.com/testing-library/jest-dom} - Jest-DOM matchers
 */

/**
 * Import Vitest global types
 *
 * This makes Vitest's global test functions available without explicit imports.
 * Includes: describe, it, test, expect, beforeEach, afterEach, beforeAll,
 * afterAll, vi (mock utilities), and more.
 *
 * With this import, you can write tests like:
 * ```typescript
 * describe('test suite', () => {
 *   it('test case', () => {
 *     expect(1 + 1).toBe(2);
 *   });
 * });
 * ```
 *
 * Without needing:
 * ```typescript
 * import { describe, it, expect } from 'vitest';
 * ```
 */
import "vitest/globals";

/**
 * Import Jest-DOM custom matchers
 *
 * This extends Vitest's expect with custom matchers for DOM testing.
 * These matchers make it easier to write assertions about DOM elements.
 *
 * Available matchers include:
 * - toBeInTheDocument(): Element exists in the DOM
 * - toBeVisible(): Element is visible to the user
 * - toBeDisabled(): Element is disabled
 * - toHaveClass(className): Element has the specified CSS class
 * - toHaveTextContent(text): Element contains the specified text
 * - toHaveAttribute(attr, value): Element has the specified attribute
 * - toHaveStyle(styles): Element has the specified CSS styles
 * - toBeChecked(): Checkbox/radio is checked
 * - toHaveValue(value): Input has the specified value
 * - And many more...
 *
 * Example usage:
 * ```typescript
 * const button = screen.getByRole('button');
 * expect(button).toBeInTheDocument();
 * expect(button).toHaveClass('btn-primary');
 * expect(button).not.toBeDisabled();
 * ```
 *
 * @see {@link https://github.com/testing-library/jest-dom#custom-matchers} - Full matcher list
 */
import "@testing-library/jest-dom/vitest";
