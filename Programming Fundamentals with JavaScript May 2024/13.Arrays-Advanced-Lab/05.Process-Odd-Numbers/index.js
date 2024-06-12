function processOdNumbers(arr) {
    let result = arr.filter((num, item) => item % 2 !== 0).map((x) => x * 2).reverse();
    console.log(result.join(" "));
}

processOdNumbers([10, 15, 20, 25]);