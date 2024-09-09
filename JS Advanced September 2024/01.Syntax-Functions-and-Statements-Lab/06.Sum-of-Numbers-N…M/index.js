function sumOfNumbersNM(n1AsString, n2AsString) {
    let result = 0;

    for (let i = Number(n1AsString); i <= Number(n2AsString); i++) {
        result += i;
    }

    console.log(result);
}

sumOfNumbersNM('1', '5');