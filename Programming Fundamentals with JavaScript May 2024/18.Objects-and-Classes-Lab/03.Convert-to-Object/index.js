function convertToObject(json) {
    const obj = JSON.parse(json);

    for (const objKey in obj) {
        console.log(`${objKey}: ${obj[objKey]}`);
    }
}

convertToObject('{"name": "George", "age": 40, "town": "Sofia"}');