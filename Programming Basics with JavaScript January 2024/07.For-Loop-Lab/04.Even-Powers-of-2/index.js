function power(input) {
    let n = Number(input[0]);

    for (let i = 0; i <= n; i += 2) {
        console.log(Math.pow(2, i));
    }
}

power(['4']);