function oddAndEvenSum(number) {
    let numberStr = number.toString();
    let evenSum = 0;
    let oddSum = 0;

    for (let i = 0; i < numberStr.length; i++) {
        let curNum = Number(numberStr[i]);

        if (curNum % 2 === 0) {
            evenSum += curNum;
        }
        else {
            oddSum += curNum;
        }
    }

    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
}

oddAndEvenSum(1000435);