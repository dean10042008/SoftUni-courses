import assert from 'assert';

import { sum } from "./index.js";

describe("sum", function () {

    describe('Happy Path', () => {
        it("returns the sum of two numbers", () => {
            const result = sum([1, 2]);
            const expected = 3;

            assert.equal(result, expected);
        });
        it("returns the sum of more numbers", () => {
            const result = sum([1, 2, 7, 9, 7, 10, 15]);
            const expected = 51;

            assert.equal(result, expected);
        });
    });
    describe('Edge Cases', () => { 
        it('returns 0 for empty array', () => {
            const result = sum([]);
            const expected = 0;

            assert.equal(result, expected);
        });    
    })
    describe('Validation', () => {
        it("takes array as argument", () => {
            const result = sum("foo");
            
            assert.ok(isNaN(result));
        });
    })
    describe('Test Overload', () => {
        it ("returns sum of negative numbers", () => {
            const result = sum([-1, -6, -8]);
            const expected = -15;

            assert.equal(result, expected);
        });
    });
});