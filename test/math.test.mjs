import assert from 'node:assert/strict';
import { subtract, sum } from '../src/math.js';

assert.equal(sum(2, 3), 5);
assert.equal(sum(-1, 1), 0);
assert.equal(subtract(5, 3), 2);
assert.equal(subtract(0, 7), -7);

console.log('All tests passed');
