function townPopulation(arr) {
    let result = {};

    for (const command of arr) {
        const [city, population] = command.split(' <-> ');

        if (city in result) {
            result[city] += Number(population);
        }
        else {
            result[city] = Number(population);
        }
    }

    for (const resultKey in result) {
        console.log(`${resultKey} : ${result[resultKey]}`);
    }
}

townPopulation(['Sofia <-> 1200000', 'Montana <-> 20000', 'New York <-> 10000000', 'Washington <-> 2345000', 'Las Vegas <-> 1000000']);