function NxNMatrix(n) {
    let result = [];
    for (let i = 1; i <= n; i++) {
        result = [];
        for (let j = 1; j <= n; j++) {
            result.push(n);
        }
        console.log(result.join(' '));
    }
}

NxNMatrix(3);