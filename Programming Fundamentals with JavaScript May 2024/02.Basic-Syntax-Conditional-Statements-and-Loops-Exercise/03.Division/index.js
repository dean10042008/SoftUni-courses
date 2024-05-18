function division(number) {
    let usage = 0;

    if (number % 2 === 0) {
        usage = 2;
    }
    if (number % 3 === 0) {
        usage = 3;
    }
    if (number % 6 === 0) {
        usage = 6;
    }
    if (number % 7 === 0) {
        usage = 7;
    }
    if (number % 10 === 0) {
        usage = 10;
    }

    if (number % 2 !== 0 && number % 3 !== 0 && number % 6 !== 0 && number % 7 !== 0 && number % 10 !== 0) {
        console.log("Not divisible")
    }
    else  {
        console.log(`The number is divisible by ${usage}`);
    }
}

division(30);