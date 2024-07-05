function travelTime(arr) {
    const result = {};

    arr.forEach((element) => {
        const [country, city, price] = element.split(' > ');

        if (!result[country]) {
            result[country] = new Set();
            result[country].add([city, price]);
        }
        else {
            let iterator = result[country].values();
            if (iterator.next().value[0] !== city) {
                result[country].add([city, price]);
            }
            else {
                result[country].forEach(element => {
                    if (element[0] === city && Number(element[1]) >= price) {
                        element[1] = price;
                    }
                })
            }
        }
    })

    const entries = Object.entries(result);



    entries.forEach((element) => {
        const arrToSort = Array.from(element[1]);

        arrToSort.sort((a, b) => {
            return Number(a[1]) - Number(b[1]);
        })

        element[1] = arrToSort;
    })

    entries.sort((a, b) => {
        return a[0].localeCompare(b[0]);
    });

    for (const resultKey of entries) {
        let resultArr = [];

        let country = resultKey.shift();

        resultArr.push(`${country} ->`);

        resultKey.forEach((key) => {
            key.forEach((item) => {
                resultArr.push(` ${item[0]} -> ${item[1]}`);
            })
        })

        console.log(resultArr.join(""))
    }
}

travelTime(["Bulgaria > Sofia > 500", "Bulgaria > Sopot > 800", "France > Paris > 2000", "Albania > Tirana > 1000", "Bulgaria > Sofia > 200"]);