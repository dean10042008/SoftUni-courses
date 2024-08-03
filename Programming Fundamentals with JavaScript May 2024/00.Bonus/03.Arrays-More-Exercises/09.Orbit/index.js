function orbit([width, height, x, y]) {
    let matrix = Array.from({ length: height }, () => Array(width).fill(0));

    let queue = [[x, y]];
    matrix[y][x] = 1;

    const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1],  // Vertical and horizontal
        [1, 1], [-1, -1], [1, -1], [-1, 1]  // Diagonal
    ]

    while (queue.length > 0) {
        const [curX, curY] = queue.shift();

        for (const [dx, dy] of directions) {
            const newX = curX + dx;
            const newY = curY + dy;

            if (newX >= 0 && newX < width && newY >= 0 && newY < height && matrix[newY][newX] === 0) {
                matrix[newY][newX] = matrix[curY][curX] + 1;
                queue.push([newX, newY]);
            }
        }
    }

    matrix.forEach(row => console.log(row.join(" ")));
}

orbit([4, 4, 0, 0]);