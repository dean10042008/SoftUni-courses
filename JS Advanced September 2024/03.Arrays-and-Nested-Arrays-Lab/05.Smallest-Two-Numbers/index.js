function smallestTwoNumbers(arr) {
    const sorted = arr.sort((a, b) => a - b);
    console.log(`${sorted[0]} ${sorted[1]}`);
}

smallestTwoNumbers([30, 15, 50, 5]);