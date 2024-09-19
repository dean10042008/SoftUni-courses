function jansNotation(arr) {
    const numbers = [];

    let isFinished = false;

    while (!isFinished) {
        const arrEl = arr.shift();
        if (typeof arrEl === 'number') {
            numbers.push(arrEl);
        }
        else {
            if (numbers[1] === undefined) {
                if (typeof arrEl === 'string') {
                    console.log("Error: not enough operands!");
                    return;
                }

                isFinished = true;
                break;
            }

            const secondNumber = numbers.pop();
            const firstNumber = numbers.pop();
            const operation = arrEl;

            if (secondNumber === undefined) {
                console.log("Error: not enough operands!");
                return;
            }

            if (operation === undefined) {
                console.log("Error: too many operands!");
                return;
            }

            let result = 0;

            switch (operation) {
                case "+":
                    result = firstNumber + secondNumber;
                    break;
                case "-":
                    result = firstNumber - secondNumber;
                    break;
                case "*":
                    result = firstNumber * secondNumber;
                    break;
                case "/":
                    result = firstNumber / secondNumber;
                    break;
            }

            numbers.push(result);
        }
    }

    console.log(numbers[0]);
}

jansNotation([3, 4, '+']);