function lastKNumbersSequence(n, k) {
    let result = [1];

    for (let i = 0; i < n - 1; i++) {
        let newNum = 0;

        for (let j = i; j > i - k; j--) {
            if (j >= 0) {
                newNum += result[j];
            }
        }
        result.push(newNum);
    }

    // Should be returned, but I like to keep the console.log() instead.
    console.log(result);
}

lastKNumbersSequence(6, 3);