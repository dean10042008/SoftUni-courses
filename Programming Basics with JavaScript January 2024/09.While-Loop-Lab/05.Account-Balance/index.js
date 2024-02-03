function money(input) {
    let totalSum = 0;
    let i = 0;
    let currentWord = input[i];

    while (currentWord !== "NoMoreMoney" ) {
        let currentNum = Number(currentWord);

        if (currentNum < 0) {
            console.log('Invalid operation!');
            break;
        }

        console.log(`Increase: ${currentNum.toFixed(2)}`);
        totalSum += currentNum;
        i++;
        currentWord = input[i];
    }

    console.log(`Total: ${totalSum.toFixed(2)}`);
}

money(["5.51", "69.42", "100", "NoMoreMoney"]);