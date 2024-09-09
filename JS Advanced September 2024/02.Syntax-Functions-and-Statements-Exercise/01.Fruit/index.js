function fruit(fruitName, grams, pricePerKilo) {
    const money = (grams / 1000) * pricePerKilo;

    console.log(`I need $${money.toFixed(2)} to buy ${(grams / 1000).toFixed(2)} kilograms ${fruitName}.`);
}

fruit('orange', 2500, 1.80);