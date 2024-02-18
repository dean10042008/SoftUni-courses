function multiplyTable(input) {
    let number = input[0];

    let firstDigit = Number(number[0]);
    let secondDigit = Number(number[1]);
    let thirdDigit = Number(number[2]);

    for (let i = 1; i <= thirdDigit; i++) {
        for (let j = 1; j <= secondDigit; j++) {
            for (let k = 1; k <= firstDigit; k++) {
                console.log(`${i} * ${j} * ${k} = ${i * j * k};`);
            }
        }
    }
}

multiplyTable(["324"]);