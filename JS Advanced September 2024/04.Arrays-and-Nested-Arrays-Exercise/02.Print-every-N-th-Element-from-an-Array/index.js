function printEveryNElementFromAnArray(arr, step) {
    let result = [];

    for (let i = 0; i < arr.length; i += step) {
        result.push(arr[i]);
    }

    // Should be returned, but I like to keep the console.log() instead.
    console.log(result);
}

printEveryNElementFromAnArray(['5', '20', '31', '4', '20'], 2);