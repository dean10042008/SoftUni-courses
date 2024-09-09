function greatestCommonDivisor(n1, n2) {
    let divisor = 1;

    const bigger = Math.max(n1, n2);

    for (let i = 1; i <= bigger; i++) {
        if (n1 % i === 0 && n2 % i === 0) {
            divisor = i;
        }
    }

    console.log(divisor);
}

greatestCommonDivisor(15, 5);