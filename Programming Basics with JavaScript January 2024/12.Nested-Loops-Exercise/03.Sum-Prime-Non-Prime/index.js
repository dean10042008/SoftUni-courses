function sumPrimeNonPrime(input) {
    let primeSum = 0;
    let nonPrimeSum = 0;

    let i = 0;
    let command = input[i];
    i++;

    while (command !== "stop") {
        let num = Number(command);

        let isPrime = true;

        if (num < 0) {
            console.log("Number is negative.");
            command = input[i];
            i++;
            continue;
        }

        for (let divisor = 2; divisor < num; divisor++) {
            if (num % divisor === 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) {
            primeSum += num;
        }
        else {
            nonPrimeSum += num;
        }

        command = input[i];
        i++;
    }
    console.log(`Sum of all prime numbers is: ${primeSum}`);
    console.log(`Sum of all non prime numbers is: ${nonPrimeSum}`);
}

sumPrimeNonPrime(["3", "9", "0", "7", "19", "4", "stop"]);