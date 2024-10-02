import assert from 'assert';

import { mathEnforcer } from "./index.js";

describe('mathEnforcer', () => {
    describe('addFive', () => {
        it("returns undefined if input is a string", () => {
            const result = mathEnforcer.addFive("0");
            const expected = undefined;
            assert.deepEqual(result, expected);
        });
        it("returns undefined if input is an array", () => {
            const result = mathEnforcer.addFive([0, 0, 0]);
            const expected = undefined;
            assert.deepEqual(result, expected);
        });
        it("returns correct value with positive number", () => {
            const result = mathEnforcer.addFive(5);
            const expected = 10;
            assert.deepEqual(result, expected);
        });
        it("returns correct value with negative number", () => {
            const result = mathEnforcer.addFive(-5);
            const expected = 0;
            assert.deepEqual(result, expected);
        });
        it("returns correct value with floating-point number", () => {
            const result = mathEnforcer.addFive(1.23);
            const expected = 6.23;
            assert.closeTo(result, expected, 0.01);
        });
    });

    describe('subtractTen', () => {
        it("returns undefined if input is a string", () => {
            const result = mathEnforcer.subtractTen("10");
            const expected = undefined;
            assert.deepEqual(result, expected);
        });
        it("returns undefined if input is an array", () => {
            const result = mathEnforcer.subtractTen([10, 10]);
            const expected = undefined;
            assert.deepEqual(result, expected);
        });
        it("returns correct value with positive number", () => {
            const result = mathEnforcer.subtractTen(20);
            const expected = 10;
            assert.deepEqual(result, expected);
        });
        it("returns correct value with negative number", () => {
            const result = mathEnforcer.subtractTen(-10);
            const expected = -20;
            assert.deepEqual(result, expected);
        });
        it("returns correct value with floating-point number", () => {
            const result = mathEnforcer.subtractTen(10.75);
            const expected = 0.75;
            assert.closeTo(result, expected, 0.01);
        });
    });

    describe('sum', () => {
        it("returns undefined if first parameter is not a number", () => {
            const result = mathEnforcer.sum("5", 5);
            const expected = undefined;
            assert.deepEqual(result, expected);
        });
        it("returns undefined if second parameter is not a number", () => {
            const result = mathEnforcer.sum(5, "5");
            const expected = undefined;
            assert.deepEqual(result, expected);
        });
        it("returns correct value for two positive numbers", () => {
            const result = mathEnforcer.sum(5, 5);
            const expected = 10;
            assert.deepEqual(result, expected);
        });
        it("returns correct value for two negative numbers", () => {
            const result = mathEnforcer.sum(-5, -10);
            const expected = -15;
            assert.deepEqual(result, expected);
        });
        it("returns correct value with floating-point numbers", () => {
            const result = mathEnforcer.sum(1.5, 2.75);
            const expected = 4.25;
            assert.closeTo(result, expected, 0.01);
        });
    });
});