function findTheMoneyForAni(arr) {
    let numberOfPens = Number(arr[0]);
    let numberOfMarkers = Number(arr[1]);
    let litresOfDetergent = Number(arr[2]);
    let discountNumber = Number(arr[3]);


    let priceForPens = numberOfPens * 5.80;
    let priceForMarkers = numberOfMarkers * 7.20;
    let priceForDetergent = litresOfDetergent * 1.20;
    let discountPercent = discountNumber / 100;

    let sumWithoutDiscount = priceForPens + priceForMarkers + priceForDetergent;

    let sumWithDiscount = sumWithoutDiscount - (sumWithoutDiscount * discountPercent);

    console.log(sumWithDiscount);
}

findTheMoneyForAni(["2", "3", "4", "25"])