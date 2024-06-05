function signCheck(n1, n2, n3) {
    let input = [n1, n2, n3];
    let negativeCount = 0;

    for (let i = 0; i < input.length; i++) {
        let value = input[i];

        if (value < 0) {
            negativeCount++;
        }
    }

    if (negativeCount % 2 === 0) {
        console.log(`Positive`);
    }
    else {
        console.log(`Negative`);
    }
}

signCheck(5, 12, -15);