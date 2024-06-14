function sorting(arr) {
    let result = [];

    let sliced = arr.slice();

    arr.sort((a, b) => b - a);

    for (let i = 0; i < (sliced.length / 2); i++) {
        result.push(arr.shift());
        result.push(arr.pop());
    }

    console.log(result.join(" "));
}

sorting([1, 21, 3, 52, 69, 63, 31, 2, 18, 94]);