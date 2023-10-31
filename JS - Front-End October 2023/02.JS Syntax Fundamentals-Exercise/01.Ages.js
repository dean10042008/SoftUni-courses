function solve (age) {
    let result;

    if (age >= 66) {
        result = 'elder';
    }
    else if (age < 66 && age >= 20) {
        result = 'adult';
    }
    else if (age < 20 && age >= 14) {
        result = 'teenager';
    }
    else if (age < 13 && age >= 3) {
        result = 'child';
    }
    else if (age <= 2 && age >= 0) {
        result = 'baby';
    }
    else {
        result = 'out of bounds';
    }

    console.log(result);

}

solve(20);
solve(1);
solve(100);
solve(-1);