function biggerHalf(arr) {
    let sorted = arr.sort((a, b) => a - b);
    const middleIndex = Math.floor(sorted.length / 2);

    const bigger = sorted.slice(middleIndex);

    // Should be returned, but I like to keep the console.log() instead.
    console.log(bigger);
}

biggerHalf([4, 7, 2, 5]);