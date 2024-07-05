function aMinerTask(arr) {
    const result = {};

    for (let i = 0; i < arr.length; i += 2) {
        const item = arr[i];
        const quantity = arr[i + 1];

        if (result.hasOwnProperty(item)) {
            result[item] = Number(result[item]) + Number(quantity);
        }
        else {
            result[item] = quantity;
        }
    }

    for (const resource in result) {
        console.log(`${resource} -> ${result[resource]}`);
    }
}

aMinerTask(['Gold', '155', 'Silver', '10', 'Copper', '17']);