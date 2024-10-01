function subSum(arr, firstIndex, lastIndex) {
    if (firstIndex < 0) {
        firstIndex = 0;
    }
    if (lastIndex >= arr.length) {
        lastIndex = arr.length - 1;
    }

    if (typeof arr !== 'object') {
        return NaN;
    }
    
    let sum = 0;

    for (let i = firstIndex; i <= lastIndex; i++) {
        if (typeof arr[i] !== 'number') {
            return NaN;
        }
        sum += arr[i];
    }
    
    // Should be returned, but I like to keep the console.log() instead.
    console.log(sum);
}

subSum([10, 20, 30, 40, 50, 60], 3, 300);