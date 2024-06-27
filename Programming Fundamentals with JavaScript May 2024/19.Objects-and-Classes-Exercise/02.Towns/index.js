function towns(arr) {
    for (const city of arr) {
        const tokens = city.split(' | ');
        const town = tokens.shift();
        const latitude = Number(tokens.shift()).toFixed(2);
        const longitude = Number(tokens.shift()).toFixed(2);

        let obj = {
            town,
            latitude,
            longitude,
        };

        console.log(obj);
    }
}

towns(['Sofia | 42.696552 | 23.32601', 'Beijing | 39.913818 | 116.363625']);