function specialNumbers(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum = 0;
        let currentNumberInString = i.toString();
        for (let j = 0; j < currentNumberInString.length; j++) {
            let currentChar = Number(currentNumberInString[j]);
            sum += currentChar;
        }
        if (sum === 5 || sum === 7 || sum === 11) {
            console.log(`${i} -> True`);
        }
        else {
            console.log(`${i} -> False`);
        }
    }
}

specialNumbers(15);