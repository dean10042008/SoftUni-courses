function biggestElement(matrix) {
    const arr = matrix.flat();
    const sorted = arr.sort((a, b) => b - a);

    const biggest = sorted[0];

    console.log(biggest);
}

biggestElement([[20, 50, 10], [8, 33, 145]]);