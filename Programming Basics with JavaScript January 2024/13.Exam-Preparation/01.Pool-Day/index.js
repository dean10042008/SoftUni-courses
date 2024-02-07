function pool(input) {
    let peopleCount = Number(input[0]);
    let priceEntry = Number(input[1]);
    let priceOneSunLounger = Number(input[2]); 
    let priceOneUmbrella = Number(input[3]);

    let priceEntryAll = peopleCount * priceEntry;

    let priceAllSunLoungers = Math.ceil((peopleCount * 0.75)) * priceOneSunLounger;
    let priceAllUmbrellas = Math.ceil(peopleCount / 2) * priceOneUmbrella;

    let priceAll = priceEntryAll + priceAllSunLoungers + priceAllUmbrellas;

    console.log(`${priceAll.toFixed(2)} lv.`);
}

pool(["21", "5.50", "4.40", "6.20"]);