import assert from "assert";

import { onlineStore } from "./onlineStore.js";

describe('onlineStore', function() {
    describe('isProductAvailable', function() {
        it("throws error for incorrect input values", () => {
            assert.throws(() => onlineStore.isProductAvailable(1, 1), Error, "Invalid input.");
            assert.throws(() => onlineStore.isProductAvailable("a", "b"), Error, "Invalid input.");
        });

        it("returns correct value if product is out of stock", () => {
            const result = onlineStore.isProductAvailable("a", -1);
            const expected = `Sorry, a is currently out of stock.`;

            assert.deepEqual(result, expected);
        });

        it("returns correct value if product is available", () => {
            const result = onlineStore.isProductAvailable("a", 1);
            const expected = `Great! a is available for purchase.`;

            assert.deepEqual(result, expected);
        });
    });
    
    describe('canAffordProduct', function() {
        it("throws error for incorrect input values", () => {
            assert.throws(() => onlineStore.canAffordProduct("a", 1), Error, "Invalid input.");
            assert.throws(() => onlineStore.canAffordProduct(1, "a"), Error, "Invalid input.");
        });

        it("returns correct value if remaining balance is negative", () => {
            const result = onlineStore.canAffordProduct(1, 0);
            const expected = "You don't have sufficient funds to buy this product.";

            assert.deepEqual(result, expected);
        });

        it("returns correct value if product is available", () => {
            const result = onlineStore.canAffordProduct(1, 1);
            const expected = "Product purchased. Your remaining balance is $0.";

            assert.deepEqual(result, expected);
        });
    });
    
    describe('getRecommendedProducts', function() {
        it("throws error for incorrect input values", () => {
            assert.throws(() => onlineStore.getRecommendedProducts("a", "a"), Error, "Invalid input.");
            assert.throws(() => onlineStore.getRecommendedProducts([], 1), Error, "Invalid input.");
        });

        it("returns correct value if there are no recommended products", () => {
            const products = [
                { name: "a", category: "b" },
                { name: "b", category: "c" },
                { name: "c", category: "d" },
                { name: "d", category: "c" },
            ]

            const result = onlineStore.getRecommendedProducts(products, "e");
            const expected = "Sorry, we currently have no recommended products in the e category.";

            assert.deepEqual(result, expected);
        });

        it("returns correct value if product is available", () => {
            const products = [
                { name: "a", category: "b" },
                { name: "b", category: "c" },
                { name: "c", category: "d" },
                { name: "d", category: "c" },
            ]

            const result = onlineStore.getRecommendedProducts(products, "c");
            const expected = "Recommended products in the c category: b, d";

            assert.deepEqual(result, expected);
        });
    });
});