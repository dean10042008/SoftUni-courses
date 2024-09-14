function sortingNumbers(arr) {
    let result = [];

    arr.sort((a, b) => a - b);

    const middleIndex = arr.length;

    for (let i = 0; i < middleIndex; i += 2) {
        result.push(arr.shift());
        result.push(arr.pop());
    }

    // Should be returned, but I like to keep the console.log() instead.
    console.log(result);
}

sortingNumbers([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]);