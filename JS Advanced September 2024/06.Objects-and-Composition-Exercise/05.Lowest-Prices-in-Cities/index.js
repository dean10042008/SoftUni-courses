function lowestPricesInCities(arr) {
    let productMap = new Map();

    for (const el of arr) {
        const [city, product, price] = el.split(" | ");
        const productPrice = Number(price);

        if (!productMap.has(product)) {
            productMap.set(product, { town: city, price: productPrice });
        } else {
            if (productPrice < productMap.get(product).price) {
                productMap.set(product, { town: city, price: productPrice });
            }
        }
    }

    for (const [product, data] of productMap.entries()) {
        console.log(`${product} -> ${data.price} (${data.town})`);
    }
}

lowestPricesInCities(['Sample Town | Sample Product | 1000', 'Sample Town | Orange | 2', 'Sample Town | Peach | 1', 'Sofia | Orange | 3', 'Sofia | Peach | 2', 'New York | Sample Product | 1000.1', 'New York | Burger | 10']);