function oneToN(input) {
    let n = Number(input[0]);

    for (let i = 1; i <= n; i = i + 3) {
        console.log(i);
    }
}

oneToN(['15']);