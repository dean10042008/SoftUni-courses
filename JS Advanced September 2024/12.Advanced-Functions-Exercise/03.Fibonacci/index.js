function getFibonator() {
    let initial = [];

    function getNextNumber() {
        let prev1 = initial[initial.length - 1];
        let prev2 = initial[initial.length - 2];

        if (!prev1) {
            prev1 = 1;
        }
        if (!prev2) {
            prev2 = 0;
        }

        let sum = prev1 + prev2;
        initial.push(sum);

        return sum;
    }

    return getNextNumber;
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13