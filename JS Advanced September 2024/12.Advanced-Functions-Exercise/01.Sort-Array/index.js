function sortArray (arr, type) {
    let result = [];

    if (type === 'asc') {
        result = arr.sort((a, b) => a - b);
    }
    else if (type === 'desc') {
        result = arr.sort((a, b) => b - a);
    }

    // Should be returned, but I like to keep the console.log() instead.
    console.log(result);
}

sortArray([14, 7, 17, 6, 8], 'asc');