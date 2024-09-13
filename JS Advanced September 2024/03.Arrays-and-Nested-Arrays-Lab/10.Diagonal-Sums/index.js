function diagonalSums(matrix) {
    let mainDiagonalSum = 0;
    let secondaryDiagonalSum = 0;

    for (let i = 0; i < matrix.length; i++) {
        mainDiagonalSum += matrix[i][i];
    }

    let j = matrix.length - 1;
    for (let i = 0; i < matrix.length; i++) {
        secondaryDiagonalSum += matrix[i][j];

        j--;
    }

    console.log(mainDiagonalSum + " " + secondaryDiagonalSum);
}

diagonalSums([[20, 40], [10, 60]]);