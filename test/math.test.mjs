import assert from 'node:assert/strict';
import { divide, multiply, subtract, sum } from '../src/math.js';

assert.equal(sum(2, 3), 5);
assert.equal(sum(-1, 1), 0);
assert.equal(subtract(5, 3), 2);
assert.equal(subtract(0, 7), -7);
assert.equal(multiply(4, 3), 12);
assert.equal(multiply(-2, 6), -12);
assert.equal(divide(12, 3), 4);
assert.throws(
  () => divide(10, 0),
  new Error('Division by zero is not allowed')
);

console.log('All tests passed');
