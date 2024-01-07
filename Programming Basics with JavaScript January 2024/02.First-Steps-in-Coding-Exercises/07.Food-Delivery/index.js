function findThePriceForTheDining(arr) {
    let numChickenMenus = Number(arr[0]);
    let numFishMenus = Number(arr[1]);
    let numVegeterianMenus = Number(arr[2]);

    let priceChickenMenus = numChickenMenus * 10.35;
    let priceFishMenus = numFishMenus * 12.40;
    let priceVegeterianMenus = numVegeterianMenus * 8.15;

    let totalPriceMenus = priceChickenMenus + priceFishMenus + priceVegeterianMenus;

    let priceDessert = totalPriceMenus * 0.20;
    let priceDelivery = 2.50;

    let total = totalPriceMenus + priceDessert + priceDelivery;

    console.log(total);
}

findThePriceForTheDining(["9", "2", "6"])