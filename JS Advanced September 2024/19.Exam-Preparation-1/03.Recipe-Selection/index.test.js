import assert from "assert";

import { recipeSelection } from "./recipeSelection.js";

describe('recipeSelection', function() { 
    let ref;

    beforeEach(function() {
        ref = recipeSelection;
    });
    
    describe("isTypeSuitable", function() {
        it("throws error for non-string values", () => {
            assert.throws(() => ref.isTypeSuitable(1, "a"), Error, "Invalid input");
            assert.throws(() => ref.isTypeSuitable("a", 1), Error, "Invalid input");
        });

        it("returns correct value if vegetarian", () => {
            const result = ref.isTypeSuitable("Meat", "Vegetarian");
            const expected = "This recipe is not suitable for vegetarians";

            assert.deepEqual(result, expected);
        });

        it("returns correct value if vegan", () => {
            const resultMeat = ref.isTypeSuitable("Meat", "Vegan");
            const resultDairy = ref.isTypeSuitable("Dairy", "Vegan");
            const expected = "This recipe is not suitable for vegans";

            assert.deepEqual(resultMeat, expected);
            assert.deepEqual(resultDairy, expected);
        });

        it("returns correct value if suitable", () => {
            const result = ref.isTypeSuitable("Meat", "Normal");
            const expected = "This recipe is suitable for your dietary restriction";

            assert.deepEqual(result, expected);
        });
    });

    describe("isItAffordable", function() {
        it("throws error for non-number values", () => {
            assert.throws(() => ref.isItAffordable(1, "a"), Error, "Invalid input");
            assert.throws(() => ref.isItAffordable("a", 1), Error, "Invalid input");
        });

        it("correctly if negative balance", () => {
            const result = ref.isItAffordable(1, 0);
            const expected = "You don't have enough budget to afford this recipe";

            assert.deepEqual(result, expected);
        });

        it("correctly calculates and returns value", () => {
            const result = ref.isItAffordable(0, 1);
            const expected = `Recipe ingredients bought. You have ${1}$ left`;

            assert.deepEqual(result, expected);
        });
    });

    describe("getRecipesByCategory", function() {
        it("throws error for incorrect input values", () => {
            assert.throws(() => ref.getRecipesByCategory("a", "a"), Error, "Invalid input");
            assert.throws(() => ref.getRecipesByCategory([], 1), Error, "Invalid input");
        });

        it("correctly filters by category and then by title", () => {
            const recipes = [
                { title: "Recipe 1", category: "Meat" },
                { title: "Recipe 2", category: "Dessert" },
                { title: "Recipe 3", category: "Vegetarian" },
            ];

            const result = ref.getRecipesByCategory(recipes, "Meat");
            const expected = ["Recipe 1"];

            assert.deepEqual(result, expected);
        });
    });
});