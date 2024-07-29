function garage(arr) {
    const result = {};

    let counter = 1;

    for (const combination of arr) {
        const [garageNumber, carInfo] = combination.split(' - ');

        const carArr = carInfo.split(', ');

        if (!(garageNumber in result)) {
            result[garageNumber] = {};
        }

        result[garageNumber]["car" + counter] = {};

        carArr.forEach((carCombo) => {
            const [key, value] = carCombo.split(': ');

            result[garageNumber]["car" + counter][key] = value;
        })

        counter++;
    }

    for (const resultKey in result) {
        console.log(`Garage № ${resultKey}`);

        for (const car in result[resultKey]) {
            const res = [];

            for (const carKey in result[resultKey][car]) {
                res.push(`${carKey} - ${result[resultKey][car][carKey]}`);
            }

            console.log(`--- ${res.join(", ")}`);
        }
    }
}

garage(['1 - color: blue, fuel type: diesel', '1 - color: red, manufacture: Audi', '2 - fuel type: petrol', '4 - color: dark blue, fuel type: diesel, manufacture: Fiat']);