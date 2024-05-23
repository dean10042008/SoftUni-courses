function amazingNumbers(num) {
    num = num.toString();
    let sum = 0;

    for (let i = 0; i < num.length; i++) {
        sum += Number(num[i]);
    }

    let result = sum.toString().includes("9");

    if (result) {
        console.log(`${num} Amazing? True`);
    }
    else {
        console.log(`${num} Amazing? False`)
    }
}

amazingNumbers(1233);