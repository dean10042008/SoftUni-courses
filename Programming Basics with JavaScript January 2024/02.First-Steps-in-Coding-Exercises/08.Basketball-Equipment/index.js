function basketballEquipment(arr) {
    let annualPrice = Number(arr[0]);

    let priceShoes = annualPrice - (annualPrice * 0.40);
    let priceSuit = priceShoes - (priceShoes * 0.20);
    let priceBall = priceSuit * 0.25;
    let priceAccesories = priceBall * 0.20;

    let total = annualPrice + priceShoes + priceSuit + priceBall + priceAccesories;

    console.log(total);
}

basketballEquipment(["365"])