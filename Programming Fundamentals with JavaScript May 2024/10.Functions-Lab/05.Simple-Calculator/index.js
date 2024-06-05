function simpleCalculator(n1, n2, operator) {

    let result = 0;

    switch (operator) {
        case "multiply":
            result = multiply(n1, n2);
            break;
        case "divide":
            result = divide(n1, n2);
            break;
        case "add":
            result = add(n1, n2);
            break;
        case "subtract":
            result = subtract(n1, n2);
            break;
    }

    function multiply(n1, n2) {
        return n1 * n2;
    }

    function divide(n1, n2) {
        return n1 / n2;
    }

    function add(n1, n2) {
        return n1 + n2;
    }

    function subtract(n1, n2) {
        return n1 - n2;
    }

    console.log(result);
}

simpleCalculator(5, 5, 'multiply');