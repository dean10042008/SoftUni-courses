function cityRecord(name, population, treasury) {
    const cityObj = {
        name,
        population,
        treasury
    };

    // Should be returned, but I like to keep the console.log() instead.
    console.log(cityObj);
}

cityRecord('Tortuga', 7000, 15000);