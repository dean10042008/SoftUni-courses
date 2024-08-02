function primeNumberChecker(number) {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            console.log(false);
            return;
        }
    }

    console.log(true);
}

primeNumberChecker(7);