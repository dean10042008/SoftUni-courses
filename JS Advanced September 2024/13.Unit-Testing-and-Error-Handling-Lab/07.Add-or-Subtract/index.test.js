import assert from 'assert';

import { createCalculator } from "./index.js";

describe("Add/Subtract", function() {
    let calc;

    beforeEach(() => {
        calc = createCalculator();
    });

    it("has correct initial value", () => {
        const result = calc.get();
        const expected = 0;

        assert.deepEqual(result, expected);
    });
    it("can add", () => {
        calc.add(1);
        const result = calc.get();
        const expected = 1;

        assert.deepEqual(result, expected);
    });
    it("can subtract", () => {
        calc.subtract(1);
        const result = calc.get();
        const expected = -1;

        assert.deepEqual(result, expected);
    });
    it("add can take numbers as string", () => {
        calc.add("1");
        const result = calc.get();
        const expected = 1;

        assert.deepEqual(result, expected);
    });
    it("subtract can take numbers as string", () => {
        calc.subtract("1");
        const result = calc.get();
        const expected = -1;

        assert.deepEqual(result, expected);
    });
});