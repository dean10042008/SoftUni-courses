import assert from 'assert';

import { PaymentPackage } from './index.js';

describe('PaymentPackage', function () {
    let pkg;

    beforeEach(() => {
        pkg = new PaymentPackage('Test Package', 100);
    });

    describe('Constructor', function () {
        it('should initialize with correct name and value', function () {
            assert.strictEqual(pkg.name, 'Test Package');
            assert.strictEqual(pkg.value, 100);
            assert.strictEqual(pkg.VAT, 20); // Default VAT
            assert.strictEqual(pkg.active, true); // Default active status
        });

        it('should throw error for invalid name (empty)', function () {
            assert.throws(() => new PaymentPackage('', 100), Error, 'Name must be a non-empty string');
        });

        it('should throw error for invalid name (non-string)', function () {
            assert.throws(() => new PaymentPackage(123, 100), Error, 'Name must be a non-empty string');
        });

        it('should throw error for invalid value (negative number)', function () {
            assert.throws(() => new PaymentPackage('Test', -100), Error, 'Value must be a non-negative number');
        });

        it('should throw error for invalid value (non-number)', function () {
            assert.throws(() => new PaymentPackage('Test', 'invalid'), Error, 'Value must be a non-negative number');
        });
    });

    describe('Name Property', function () {
        it('should set valid name', function () {
            pkg.name = 'New Package';
            assert.strictEqual(pkg.name, 'New Package');
        });

        it('should throw error when setting empty name', function () {
            assert.throws(() => { pkg.name = ''; }, Error, 'Name must be a non-empty string');
        });

        it('should throw error when setting non-string name', function () {
            assert.throws(() => { pkg.name = 123; }, Error, 'Name must be a non-empty string');
        });
    });

    describe('Value Property', function () {
        it('should set valid value', function () {
            pkg.value = 150;
            assert.strictEqual(pkg.value, 150);
        });

        it('should throw error when setting negative value', function () {
            assert.throws(() => { pkg.value = -50; }, Error, 'Value must be a non-negative number');
        });

        it('should throw error when setting non-number value', function () {
            assert.throws(() => { pkg.value = 'invalid'; }, Error, 'Value must be a non-negative number');
        });

        it('should allow zero as a valid value', function () {
            pkg.value = 0;
            assert.strictEqual(pkg.value, 0);
        });
    });

    describe('VAT Property', function () {
        it('should set valid VAT', function () {
            pkg.VAT = 25;
            assert.strictEqual(pkg.VAT, 25);
        });

        it('should throw error when setting negative VAT', function () {
            assert.throws(() => { pkg.VAT = -5; }, Error, 'VAT must be a non-negative number');
        });

        it('should throw error when setting non-number VAT', function () {
            assert.throws(() => { pkg.VAT = 'invalid'; }, Error, 'VAT must be a non-negative number');
        });
    });

    describe('Active Property', function () {
        it('should set active status to false', function () {
            pkg.active = false;
            assert.strictEqual(pkg.active, false);
        });

        it('should throw error when setting non-boolean active status', function () {
            assert.throws(() => { pkg.active = 'not a boolean'; }, Error, 'Active status must be a boolean');
        });
    });

    describe('toString Method', function () {
        it('should return correct string representation when active', function () {
            const expected = `Package: Test Package\n- Value (excl. VAT): 100\n- Value (VAT 20%): 120`;
            assert.strictEqual(pkg.toString(), expected);
        });

        it('should return correct string representation when inactive', function () {
            pkg.active = false;
            const expected = `Package: Test Package (inactive)\n- Value (excl. VAT): 100\n- Value (VAT 20%): 120`;
            assert.strictEqual(pkg.toString(), expected);
        });
    });
});