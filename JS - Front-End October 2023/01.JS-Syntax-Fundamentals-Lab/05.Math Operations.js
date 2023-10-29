function solve (fnum, snum, operator) {
    let result;
    switch (operator) {
        case '+':
            result = fnum + snum;
            break;
        case '-':
            result = fnum - snum;
            break;
        case '/':
            result = fnum / snum;
            break;
        case '*':
            result = fnum * snum;
            break;
        case '%':
            result = fnum % snum;
            break;
        case '**':
            result = fnum ** snum;
            break;
    }

    console.log(result);

}

solve(5, 6, '+');
solve(3, 5.5, '+');