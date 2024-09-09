function squareOfStars(n = 5) {
    for (let i = 1; i <= n; i++) {
        let current = [];

        for (let j = 1; j <= n; j++) {
            current.push('*');
        }

        console.log(current.join(" "));
    }
}

squareOfStars(1);