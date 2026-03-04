import assert from 'node:assert/strict';
import { sum, subtract, multiply, divide } from '../src/math.js';

// Happy path
assert.strictEqual(sum(1, 2), 3, 'sum(1,2) should be 3');
assert.strictEqual(sum(2, 3), 5, 'sum(2,3) should be 5');
assert.strictEqual(sum(-1, 1), 0, 'sum(-1,1) should be 0');

assert.strictEqual(subtract(5, 3), 2, 'subtract(5,3) should be 2');
assert.strictEqual(subtract(0, 7), -7, 'subtract(0,7) should be -7');

assert.strictEqual(multiply(2, 3), 6, 'multiply(2,3) should be 6');
assert.strictEqual(multiply(4, 3), 12, 'multiply(4,3) should be 12');
assert.strictEqual(multiply(-2, 6), -12, 'multiply(-2,6) should be -12');

assert.strictEqual(divide(6, 3), 2, 'divide(6,3) should be 2');
assert.strictEqual(divide(12, 3), 4, 'divide(12,3) should be 4');

// Edge cases
assert.throws(() => divide(1, 0), /Division by zero/, 'divide by zero should throw');
assert.throws(() => divide(10, 0), /Division by zero/, 'divide by zero should throw (10/0)');

// Type validation: non-number or non-finite inputs should throw TypeError
assert.throws(() => sum('1', 2), TypeError, 'sum should throw TypeError on non-number');
assert.throws(() => subtract(NaN, 1), TypeError, 'subtract should throw TypeError on NaN');
assert.throws(() => multiply(Infinity, 1), TypeError, 'multiply should throw TypeError on Infinity');

console.log('All tests passed');
