import assert from 'assert';

import { isOddOrEven } from "./index.js";

describe('Is Odd Or Even', () => {
    it("returns undefined if input is type number", () => {
        const result = isOddOrEven(1);
        const expected = undefined;

        assert.deepEqual(result, expected);
    });
    it("returns undefined if input is type array", () => {
        const result = isOddOrEven(["a", "b", "c"]);
        const expected = undefined;

        assert.deepEqual(result, expected);
    });
    it("returns correct value if input is with odd length", () => {
        const result = isOddOrEven("aaa");
        const expected = "odd";

        assert.deepEqual(result, expected);
    });
    it("returns correct value if input is with even length", () => {
        const result = isOddOrEven("aa");
        const expected = "even";

        assert.deepEqual(result, expected);
    });
});