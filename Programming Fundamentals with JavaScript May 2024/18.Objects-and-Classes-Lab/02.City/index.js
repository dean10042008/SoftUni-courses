function city(obj) {
    for (const objKey in obj) {
        console.log(`${objKey} -> ${obj[objKey]}`);
    }
}

city({name: "Plovdiv", area: 389, population: 1162358, country: "Bulgaria", postCode: "4000"});