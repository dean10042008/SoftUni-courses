function bonus(input) {
    let number1 = Number(input[0]);
    let bonusPoints = 0;

    if (number1 <= 100) {
        bonusPoints = 5;
    }
    else if (number1 <= 1000) {
        bonusPoints = 0.2 * number1;
    }
    else {
        bonusPoints = 0.1 * number1;
    }

    if (number1 % 2 === 0) {
        bonusPoints = bonusPoints + 1;
    }

    else if (number1 % 10 === 5) {
        bonusPoints = bonusPoints + 2;
    }

    console.log(bonusPoints);
    console.log(number1 + bonusPoints);
}

bonus(["20"]);