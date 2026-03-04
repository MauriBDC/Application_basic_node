import assert from 'node:assert/strict';
import { sum } from '../src/math.js';

assert.equal(sum(2, 3), 5);
assert.equal(sum(-1, 1), 0);

console.log('All tests passed');
