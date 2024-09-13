function processOddPositions(arr) {
    let result = [];

    for (let i = 1; i < arr.length; i += 2) {
        result.push(arr[i]);
    }

    result = result.reverse();
    const doubled = result.map(num => num * 2);

    // Should be returned, but I like to keep the console.log() instead.
    console.log(doubled.join(" "));
}

processOddPositions([10, 15, 20, 25]);