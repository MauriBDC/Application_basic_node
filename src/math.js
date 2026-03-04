/**
 * Ensure the value is a finite number.
 * @param {unknown} value
 * @param {string} name
 * @throws {TypeError} if the value is not a finite number
 */
function ensureFiniteNumber(value, name) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number`);
  }
}

/**
 * Add two finite numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError} if a or b is not a finite number
 */
export function sum(a, b) {
  ensureFiniteNumber(a, 'a');
  ensureFiniteNumber(b, 'b');
  return a + b;
}

/**
 * Subtract two finite numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError} if a or b is not a finite number
 */
export function subtract(a, b) {
  ensureFiniteNumber(a, 'a');
  ensureFiniteNumber(b, 'b');
  return a - b;
}

/**
 * Multiply two finite numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError} if a or b is not a finite number
 */
export function multiply(a, b) {
  ensureFiniteNumber(a, 'a');
  ensureFiniteNumber(b, 'b');
  return a * b;
}

/**
 * Divide two finite numbers.
 * @param {number} a - dividend
 * @param {number} b - divisor
 * @returns {number}
 * @throws {TypeError} if a or b is not a finite number
 * @throws {Error} if division by zero is attempted
 */
export function divide(a, b) {
  ensureFiniteNumber(a, 'a');
  ensureFiniteNumber(b, 'b');
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }

  return a / b;
}
