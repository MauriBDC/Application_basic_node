import assert from 'node:assert/strict';
import { multiply, subtract, sum } from '../src/math.js';

assert.equal(sum(2, 3), 5);
assert.equal(sum(-1, 1), 0);
assert.equal(subtract(5, 3), 2);
assert.equal(subtract(0, 7), -7);
assert.equal(multiply(4, 3), 12);
assert.equal(multiply(-2, 6), -12);

console.log('All tests passed');
