function orbit([width, height, x, y]) {
    let matrix = Array(height).fill().map(() => Array(width).fill());

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            matrix[row][col] = Math.max(Math.abs(x - row), Math.abs(y - col)) + 1;
        }
    }

    console.log(matrix.map(row => row.join(' ')).join('\n'));
}