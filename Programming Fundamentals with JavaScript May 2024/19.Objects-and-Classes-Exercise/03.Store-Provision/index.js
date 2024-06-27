function storeProvision(currentStock, orderedStock) {
    let result = {};

    for (let i = 0; i < currentStock.length; i += 2) {
        result[currentStock[i]] = Number(currentStock[i + 1]);
    }

    for (let i = 0; i < orderedStock.length; i += 2) {
        const product = orderedStock[i];
        const amount = Number(orderedStock[i + 1]);

        if (result.hasOwnProperty(product)) {
            result[product] += amount;
        } else {
            result[product] = amount;
        }
    }

    for (const product in result) {
        console.log(`${product} -> ${result[product]}`);
    }
}

storeProvision(['Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'], ['Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30']);