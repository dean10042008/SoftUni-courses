function oddOccurrences(str) {
    const result = {};
    let order = [];

    let arr = str.split(" ");

    arr.forEach((el) => {
        let lowercased = el.toLowerCase();
        if (result.hasOwnProperty(lowercased)) {
            result[lowercased]++;
        }
        else {
            order.push(lowercased);
            result[lowercased] = 1;
        }
    })

    let arrResult = [];

    order.forEach((word) => {
        if (result[word] % 2 !== 0) {
            arrResult.push(word);
        }
    })

    console.log(arrResult.join(" "));
}

oddOccurrences('Java C# Php PHP Java PhP 3 C# 3 1 5 C#');