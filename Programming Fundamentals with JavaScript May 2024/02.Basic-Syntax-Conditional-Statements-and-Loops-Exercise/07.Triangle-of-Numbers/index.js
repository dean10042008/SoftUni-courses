function triangleOfNumbers(n) {
    let row = '';
    for (let i = 1; i <= n; i++) {
        console.log((String(i) + ' ').repeat(i).trim(i));
    }
}

triangleOfNumbers(3);