function cleverLily(input) {
    let age = Number(input[0]);
    let washerPrice = Number(input[1]);
    let pricePerToy = Number(input[2]);

    let moneySaved = 0;
    let moneyGiven = 10

    for (let herBirthday = 1; herBirthday <= age; herBirthday++) {
        if (herBirthday % 2 !== 0) {
            moneySaved += pricePerToy;
        } 
        else {
            moneySaved += moneyGiven - 1;
            moneyGiven += 10;
        }
    }

    if (moneySaved >= washerPrice) {
        console.log(`Yes! ${(moneySaved - washerPrice).toFixed(2)}`);
    }
    else {
        console.log(`No! ${(washerPrice - moneySaved).toFixed(2)}`);
    }
}

cleverLily(["10", "170.00", "6"]);