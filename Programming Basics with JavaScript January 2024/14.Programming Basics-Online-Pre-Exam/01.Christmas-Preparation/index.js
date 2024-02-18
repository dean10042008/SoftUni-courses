function christmasPreparation(input) {
    let paper = Number(input[0]);
    let cloth = Number(input[1]);
    let glue = Number(input[2]);
    let discount = Number(input[3]);

    let price = (paper * 5.80) + (cloth * 7.20) + (glue * 1.20);
    let priceWithDiscount = price - (price * (discount / 100));
    console.log(priceWithDiscount.toFixed(3));
}

christmasPreparation(["2", "3", "2.5", "25"]);