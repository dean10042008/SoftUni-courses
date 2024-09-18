function storeCatalogue(arr) {
    let result = [];
    let lettersArr = [];
    let letterCount = 0;

    arr.forEach(item => {
        const tokens = item.split(' : ');
        const [name, price] = tokens;

        result.push(
            { [name] : price }
        );
    });

    result.sort((a, b) => {
        const aTokens = Object.keys(a)[0];
        const bTokens = Object.keys(b)[0];

        return aTokens.localeCompare(bTokens);
    });

    for (let i = 0; i < result.length; i++) {
        const item = result[i];
        for (const itemKey in item) {

            if (!lettersArr.includes(itemKey[0])) {
                letterCount = 0;
            }
            if (letterCount === 0) {
                console.log(itemKey[0]);
                letterCount++;
                lettersArr.push(itemKey[0]);
            }

            console.log(`  ${itemKey}: ${item[itemKey]}`);
        }
    }
}

storeCatalogue(['Appricot : 20.4', 'Fridge : 1500', 'TV : 1499', 'Deodorant : 10', 'Boiler : 300', 'Apple : 1.25', 'Anti-Bug Spray : 15', 'T-Shirt : 10']);