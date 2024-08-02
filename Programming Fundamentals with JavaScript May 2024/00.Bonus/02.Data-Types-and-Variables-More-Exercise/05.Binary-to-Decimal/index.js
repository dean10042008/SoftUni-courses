function binaryToDecimal(binary) {
    let result = 0;

    let powCounter = 0;

    for (let i = binary.length - 1; i >= 0; i--) {
        let number = Number(binary[i]);
        result += number * Math.pow(2, powCounter);
        powCounter++;
    }

    console.log(result);
}

binaryToDecimal("00001001");