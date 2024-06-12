function listOfProducts(arr) {
    arr.sort();

    let i = 1;
    for (const product of arr) {
        console.log(`${i}.${product}`);
        i++;
    }
}

listOfProducts(['Potatoes', 'Tomatoes', 'Onions', 'Apples']);