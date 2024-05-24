function sumDigits(number) {
    let numberStr = number.toString();
    let sum = 0;

    for (let i = 0; i < numberStr.length; i++) {
        let current = Number(numberStr[i]);
        sum += current;
    }
    console.log(sum);
}

sumDigits(245678);