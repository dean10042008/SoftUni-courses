function findTheNeededMoney(arr) {
    let nylonNeeded = Number(arr[0]);
    let paintNeeded = Number(arr[1]);
    let thinnerNeeded = Number(arr[2]);
    let workingHours = Number(arr[3]);

    let actualNylonNeeded = nylonNeeded + 2;
    let actualPaintNeeded = paintNeeded + (0.10 * paintNeeded);

    let priceForTheNylon = actualNylonNeeded * 1.50;
    let priceForThePaint = actualPaintNeeded * 14.50;
    let priceForTheThin = thinnerNeeded * 5.00;
    let priceForTheBags = 0.40;

    let priceForEverything = priceForTheNylon + priceForThePaint + priceForTheThin + priceForTheBags;
    let priceForTheWorkers = (priceForEverything * 0.30) * workingHours;

    let total = priceForEverything + priceForTheWorkers;

    console.log(total)
}

findTheNeededMoney(["10", "11", "4", "8"]);