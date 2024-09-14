function extractIncreasingSubsequenceFromArray(arr) {
    let biggest = [arr[0]];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] >= biggest[0]) {
            biggest.unshift(arr[i]);
        }
    }

    // Should be returned, but I like to keep the console.log() instead.
    console.log(biggest.reverse());
}

extractIncreasingSubsequenceFromArray([1, 3, 8, 4, 10, 12, 3, 2, 24]);