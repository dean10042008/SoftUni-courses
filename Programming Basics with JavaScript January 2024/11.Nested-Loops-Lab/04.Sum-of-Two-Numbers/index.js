function sumOfNumbers(input) {
    let start = Number(input[0]);
    let end = Number(input[1]);
    let magicNumber = Number(input[2]);

    let combinations = 0;

    for (let x = start; x <= end; x++) {
        for (let y = start; y <= end; y++) {
            let sum = x + y;
            combinations++;
            if (sum === magicNumber) {
                console.log(`Combination N:${combinations} (${x} + ${y} = ${magicNumber})`);
                return;
            }
        }
    }

    console.log(`${combinations} combinations - neither equals ${magicNumber}`);
}

sumOfNumbers(["1", "10", "5"]);