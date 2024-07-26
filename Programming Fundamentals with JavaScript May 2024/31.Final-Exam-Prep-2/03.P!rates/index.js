function pirates(arr) {
    const cities = {};

    while (arr[0] !== "Sail") {
        const [city, population, gold] = arr.shift().split("||");

        if (city in cities) {
            cities[city].population += Number(population);
            cities[city].gold += Number(gold);
        }
        else {
            cities[city] = {'population': Number(population), 'gold': Number(gold)};
        }
    }

    arr.shift();

    while (arr[0] !== "End") {
        const tokens = arr.shift().split("=>");
        const command = tokens.shift();

        if (command === "Plunder") {
            const [city, population, gold] = tokens;

            console.log(`${city} plundered! ${gold} gold stolen, ${population} citizens killed.`);

            cities[city].population -= Number(population);
            cities[city].gold -= Number(gold);

            if (cities[city].population <= 0 || cities[city].gold <= 0) {
                console.log(`${city} has been wiped off the map!`);
                delete cities[city];
            }
        }
        else if (command === "Prosper") {
            const [city, gold] = tokens;

            if (Number(gold) < 0) {
                console.log("Gold added cannot be a negative number!");
            }
            else {
                cities[city].gold += Number(gold);

                console.log(`${gold} gold added to the city treasury. ${city} now has ${cities[city].gold} gold.`);
            }
        }
    }

    const keys = Object.keys(cities);

    if (keys.length !== 0) {
        console.log(`Ahoy, Captain! There are ${keys.length} wealthy settlements to go to:`);

        for (const citiesKey in cities) {
            console.log(`${citiesKey} -> Population: ${cities[citiesKey].population} citizens, Gold: ${cities[citiesKey].gold} kg`);
        }
    }
    else {
        console.log("Ahoy, Captain! All targets have been plundered and destroyed!");
    }
}

pirates(["Tortuga||345000||1250", "Santo Domingo||240000||630", "Havana||410000||1100", "Sail", "Plunder=>Tortuga=>75000=>380", "Prosper=>Santo Domingo=>180", "End"]);