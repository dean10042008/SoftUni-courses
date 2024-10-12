import assert from "assert";

import { StringBuilder } from "./index.js";

describe("StringBuilder", function() {
    let ref;

    beforeEach(() => {
        ref = new StringBuilder();
    });

    describe("Constructor", function() {
        it("initializes as empty string with no parameters", () => {
            const result = ref.toString();
            const expected = "";

            assert.deepEqual(result, expected);
        });

        it("initializes to starting string", () => {
            ref = new StringBuilder('a');
            const result = ref.toString();
            const expected = 'a';

            assert.deepEqual(result, expected);
        });

        it("throws error for non-string values", () => {
            assert.throws(() => new StringBuilder(1), TypeError, 'Argument must be a string');
        });
    });

    describe('Append', function() {
        it("can append to empty storage", () => {
            ref.append("a");

            const result = ref.toString();
            const expected = "a";

            assert.deepEqual(result, expected);
        });

        it("can append to existing storage", () => {
            ref.append("a");
            ref.append("a");

            const result = ref.toString();
            const expected = "aa";

            assert.deepEqual(result, expected);
        });

        it("can append correctly", () => {
            ref.append("a");
            ref.append("b");

            const result = ref.toString();
            const expected = "ab";

            assert.deepEqual(result, expected);
        });

        it("throws error for non-string values", () => {
            assert.throws(() => ref.append(1), TypeError, 'Argument must be a string');
        });
    });

    describe("Prepend", function() {
        it("can prepend to empty storage", () => {
            ref.prepend("a");

            const result = ref.toString();
            const expected = "a";

            assert.deepEqual(result, expected);
        });

        it("can append to existing storage", () => {
            ref.prepend("a");
            ref.prepend("a");

            const result = ref.toString();
            const expected = "aa";

            assert.deepEqual(result, expected);
        });

        it("can prepend correctly", () => {
            ref.prepend("a");
            ref.prepend("b");

            const result = ref.toString();
            const expected = "ba";

            assert.deepEqual(result, expected);
        });

        it("throws error for non-string values", () => {
            assert.throws(() => ref.prepend(1), TypeError, 'Argument must be a string');
        });
    });

    describe("Insert At", function() {
        it("can insert a given string", () => {
            ref = new StringBuilder("aaaa");
            ref.insertAt("b", 1);

            const result = ref.toString();
            const expected = "abaaa";

            assert.deepEqual(result, expected);
        });
        
        it("throws error for non-string values", () => {
            assert.throws(() => ref.insertAt(0, 0), TypeError, 'Argument must be a string');
        });
    });

    describe("Remove", function() {
        it("can remove a given string", () => {
            ref = new StringBuilder("aaaa");
            ref.remove(1, 2);

            const result = ref.toString();
            const expected = "aa";

            assert.deepEqual(result, expected);
        });
        it("can remove a given string correctly", () => {
            ref = new StringBuilder("abcde");
            ref.remove(1, 2);

            const result = ref.toString();
            const expected = "ade";

            assert.deepEqual(result, expected);
        });
    });

    describe("To String", function() {
        it("correctly returns if storage is empty", () => {
            const result = ref.toString();
            const expected = "";

            assert.deepEqual(result, expected);
        });

        it("correctly returns value", () => {
            ref = new StringBuilder("aaaa");

            const result = ref.toString();
            const expected = "aaaa";

            assert.deepEqual(result, expected);
        });
    });

    describe('Multiple method calls', function () {
        it('Changes the string correctly', () => {
            ref = new StringBuilder('llo');

            ref.append('there!&*(');
            ref.prepend('He');
            ref.insertAt(' f', 5);
            ref.remove(12, 4);

            const result = ref.toString();
            const expected = "Hello fthere";
            
            assert.deepEqual(result, expected);
        });
    });
});