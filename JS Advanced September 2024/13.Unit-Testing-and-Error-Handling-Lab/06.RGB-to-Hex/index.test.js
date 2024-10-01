import assert from 'assert';

import { rgbToHexColor } from "./index.js";

describe("RGB to Hex", function() {

    describe('Happy Path', () => {
        it("correctly converts rgb to hex", () => {
            const result = rgbToHexColor(10, 10, 10);
            const expected = "#0A0A0A";

            assert.deepEqual(result, expected);
        });
        it("correctly converts rgb to hex", () => {
            const result = rgbToHexColor(50, 50, 50);
            const expected = "#323232";

            assert.deepEqual(result, expected);
        });
    });

    describe('Edge Cases', () => {
        it("correctly returns low edge case", () => {
            const result = rgbToHexColor(0, 0, 0);
            const expected = "#000000";
    
            assert.deepEqual(result, expected);
        });
        it("correctly returns high edge case", () => {
            const result = rgbToHexColor(255, 255, 255);
            const expected = "#FFFFFF";

            assert.deepEqual(result, expected);
        });
    });

    describe('Validation', () => {
        it("returns undefined if red is below zero", () => {
            const result = rgbToHexColor(-1, 0, 0);
            const expected = undefined;

            assert.deepEqual(result, expected);
        });
        it("returns undefined if green is below zero", () => {
            const result = rgbToHexColor(0, -1, 0);
            const expected = undefined;

            assert.deepEqual(result, expected);
        });
        it("returns undefined if blue is below zero", () => {
            const result = rgbToHexColor(0, 0, -1);
            const expected = undefined;

            assert.deepEqual(result, expected);
        });
        it("returns undefined if red is above 255", () => {
            const result = rgbToHexColor(256, 0, 0);
            const expected = undefined;

            assert.deepEqual(result, expected);
        });
        it("returns undefined if green is above 255", () => {
            const result = rgbToHexColor(0, 256, 0);
            const expected = undefined;

            assert.deepEqual(result, expected);
        });
        it("returns undefined if blue is above 255", () => {
            const result = rgbToHexColor(0, 0, 256);
            const expected = undefined;

            assert.deepEqual(result, expected);
        });
        it("returns undefined if red is not integer", () => {
            const result = rgbToHexColor(0.5, 0, 0);
            const expected = undefined;

            assert.deepEqual(result, expected);
        });
        it("returns undefined if green is not integer", () => {
            const result = rgbToHexColor(0, 0.5, 0);
            const expected = undefined;

            assert.deepEqual(result, expected);
        });
        it("returns undefined if blue is not integer", () => {
            const result = rgbToHexColor(0, 0, 0.5);
            const expected = undefined;

            assert.deepEqual(result, expected);
        });
        it("returns undefined if red is of incorrect type", () => {
            const result = rgbToHexColor("red", 0, 0);
            const expected = undefined;

            assert.deepEqual(result, expected);
        });
        it("returns undefined if green is of incorrect type", () => {
            const result = rgbToHexColor(0, "green", 0);
            const expected = undefined;

            assert.deepEqual(result, expected);
        });
        it("returns undefined if blue is of incorrect type", () => {
            const result = rgbToHexColor(0, 0, "blue");
            const expected = undefined;

            assert.deepEqual(result, expected);
        });
    });

    describe('Test Overload', () => {
        
    });
});