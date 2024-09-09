function mathOperations(n1, n2, operation) {
    let result = 0;

    switch (operation) {
        case '+':
            result = n1 + n2;
            break;
        case '-':
            result = n1 - n2;
            break;
        case '*':
            result = n1 * n2;
            break;
        case '/':
            result = n1 / n2;
            break;
        case '%':
            result = n1 % n2;
            break;
        case '**':
            result = n1 ** n2;
            break;
    }

    console.log(result);
}

mathOperations(5, 6, '+');