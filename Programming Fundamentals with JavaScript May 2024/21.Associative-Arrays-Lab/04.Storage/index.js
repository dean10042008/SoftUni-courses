function storage(arr) {
    let result = {};

    for (let item of arr) {
        const [name, value] = item.split(" ");

        if (result.hasOwnProperty(name)) {
            const old = Number(result[name]);
            const newValue = Number(value) + old;

            result[name] = newValue;
        }
        else {
            result[name] = value;
        }
    }

    for (const product in result) {
        console.log(`${product} -> ${result[product]}`);
    }
}

storage(['tomatoes 10', 'coffee 5', 'olives 100', 'coffee 40']);