import assert from 'assert';
import { isSymmetric } from "./index.js";

describe("is Symmetric", function() {

    describe('Happy Path', () => {
        it("returns true if input is symmetric", () => {
            const result = isSymmetric([1, 1, 1, 1, 1, 1]);
            const expected = true;

            assert.equal(result, expected);
        });
        it("returns false if input is asymmetric", () => {
            const result = isSymmetric(['a', 'a', 'a', 'b', 'b', 'b']);
            const expected = false;

            assert.equal(result, expected);
        });
    });

    describe('Edge Cases', () => { 
        it("returns true if input is empty array", () => {
            const result = isSymmetric([]);
            const expected = true;

            assert.equal(result, expected);
        });

        it("returns true for symmetric array with mixed types", () => {
            const result = isSymmetric([1, 'a', 'a', 1]);
            const expected = true;

            assert.equal(result, expected);
        });
        
        it("returns false for array with objects", () => {
            const result = isSymmetric([{a:1}, {b:2}, {b:2}, {a:1}]);
            const expected = true;

            assert.equal(result, expected);
        });
    });

    describe('Validation', () => {
        it("returns false if input is not an array", () => {
            const result = isSymmetric("aaa");
            const expected = false;

            assert.equal(result, expected);
        });
        
        it("returns false for null input", () => {
            const result = isSymmetric(null);
            const expected = false;

            assert.equal(result, expected);
        });

        it("returns false for undefined input", () => {
            const result = isSymmetric(undefined);
            const expected = false;

            assert.equal(result, expected);
        });
    });

    describe('Test Overload', () => {
        it("returns true if input is symmetric but with bigger length", () => {
            const result = isSymmetric([1, 5, 10, 85, 85, 10, 5, 1]);
            const expected = true;

            assert.equal(result, expected);
        });

        it("returns false if input is asymmetric with larger array", () => {
            const result = isSymmetric([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            const expected = false;

            assert.equal(result, expected);
        });
    });
});