function townsToJSON(arr) {
    let result = [];

    for (let i = 1; i < arr.length; i++) {
        let [_, town, latitude, longitude, rest] = arr[i].split('|');

        latitude = Number(Number(latitude.trim()).toFixed(2));
        longitude = Number(Number(longitude.trim()).toFixed(2));

        const current = {
            "Town": town.trim(),
            "Latitude": latitude,
            "Longitude": longitude
        }

        result.push(current);
    }

    // Should be returned, but I like to keep the console.log() instead.
    // console.log(JSON.stringify(result));
    return JSON.stringify(result);
}

townsToJSON(['| Town | Latitude | Longitude |', '| Sofia | 42.696552 | 23.32601 |', '| Beijing | 39.913818 | 116.363625 |']);