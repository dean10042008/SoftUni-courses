function specialNumbers(input) {
    let n = Number(input[0]);

    let result = "";
    let correct = 0;

    for (let curNum = 1111; curNum < 10000; curNum++) {
        correct = 0;
        let curNumStr = curNum.toString();

        for (let i = 0; i < curNumStr.length; i++) {
            let curDigit = Number(curNumStr[i]);
            if (n % curDigit === 0) {
                correct++;
            }
        }
        if (correct === 4) {
            result += curNum + " ";
        }
    }

    console.log(result);
}

specialNumbers(["3"]);