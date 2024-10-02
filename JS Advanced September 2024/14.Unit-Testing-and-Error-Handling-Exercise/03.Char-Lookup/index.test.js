import assert from 'assert';

import { lookupChar } from "./index.js";

describe('lookup Char', () => {
    it("returns undefined if string input isn't type string", () => {
        const result = lookupChar(0, 0);
        const expected = undefined;

        assert.deepEqual(result, expected);
    });
    it("returns undefined if index input isn't type number", () => {
        const result = lookupChar(0, '0');
        const expected = undefined;

        assert.deepEqual(result, expected);
    });
    it("returns undefine if index input is a floating point number", () => {
        const result = lookupChar("aa", 1.5);
        const expected = undefined;

        assert.deepEqual(result, expected);
    });
    it("returns undefined if index input is below zero", () => {
        const result = lookupChar('a', -1);
        const expected = "Incorrect index";

        assert.deepEqual(result, expected);
    });
    it("returns undefined if index input is above max length", () => {
        const result = lookupChar('aaa', 3);
        const expected = "Incorrect index";

        assert.deepEqual(result, expected);
    });
    it("returns correct char at index", () => {
        const result = lookupChar("abc", 1);
        const expected = "b";

        assert.deepEqual(result, expected);
    });
});