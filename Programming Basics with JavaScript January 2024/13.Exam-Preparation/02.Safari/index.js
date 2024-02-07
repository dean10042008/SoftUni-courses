function safari(input) {
    let budget = Number(input[0]);
    let letersNeeded = Number(input[1]);
    let day = input[2];

    let priceGas = letersNeeded * 2.10;
    let priceGuid = 100;

    let total = priceGas + priceGuid;

    if (day === "Saturday") {
        total *= 0.9;
    }
    else if (day === "Sunday") {
        total *= 0.8;
    }

    if (budget >= total) {
        console.log(`Safari time! Money left: ${(budget - total).toFixed(2)} lv.`);
    }
    else {
        console.log(`Not enough money! Money needed: ${(total - budget).toFixed(2)} lv.`);
    }
}

safari(["1000", "10", "Sunday"]);