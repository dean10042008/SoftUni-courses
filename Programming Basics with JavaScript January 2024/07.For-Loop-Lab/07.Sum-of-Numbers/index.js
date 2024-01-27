function sumOfNum(input) {
    let number = input[0];
    let sum = 0;

    for (let i = 0; i < number.length; i++) {
        let NumInMoment = Number(number[i]);

        sum += NumInMoment;
    }
    
    console.log(`The sum of the digits is:${sum}`);
}

sumOfNum(['1234']);