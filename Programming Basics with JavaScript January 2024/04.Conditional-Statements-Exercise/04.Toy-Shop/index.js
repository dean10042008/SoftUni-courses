function toys(arr) {
    let priceForVacation = Number(arr[0]);
    let numOfPuzzles = Number(arr[1]);
    let numOfToys = Number(arr[2]);
    let numOfBears = Number(arr[3]);
    let numOfMinions = Number(arr[4]);
    let numOfTracks = Number(arr[5]);

    let numInTotal = numOfPuzzles + numOfToys + numOfBears + numOfMinions + numOfTracks;
    let totalMoney = (numOfPuzzles * 2.60) + (numOfToys * 3) + (numOfBears * 4.10) + (numOfMinions * 8.20) + (numOfTracks * 2);

    if (numInTotal >= 50) {
        totalMoney = totalMoney * 0.75;
    }

    let moneyAfterRent = totalMoney * 0.9;

    if (moneyAfterRent >= priceForVacation) {
        let moneyNotNeeded = moneyAfterRent - priceForVacation;
        console.log(`Yes! ${moneyNotNeeded.toFixed(2)} lv left.`);
    }
    else {
        let moneyNotEnough = priceForVacation - moneyAfterRent;
        console.log(`Not enough money! ${moneyNotEnough.toFixed(2)} lv needed.`);
    }
}

toys(["320", "8", "2", "5", "5", "1"]);