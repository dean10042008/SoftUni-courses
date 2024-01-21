function hotel(input) {
    let dayCount = Number(input[0]);
    let spaceType = input[1];
    let feedback = input[2];

    let nightCount = dayCount - 1;

    let price = 0;

    switch (spaceType) {
        case 'room for one person':
            price = nightCount * 18;
            break;

        case 'apartment':
            price = nightCount * 25;

            if (nightCount < 10) {
                price *= 0.7;
            }
            else if (nightCount <= 15) {
                price *= 0.65;
            }
            else {
                price *= 0.5;
            }
            break;

        case 'president apartment':
            price = nightCount * 35;

            if (nightCount < 10) {
                price *= 0.9;
            }
            else if (nightCount <= 15) {
                price *= 0.85;
            }
            else {
                price *= 0.8;
            }
            break;
    }

    if (feedback === 'positive') {
        price *= 1.25;
    }
    else {
        price *= 0.9;
    }

    console.log(price.toFixed(2));
}

hotel(["14", "apartment", "positive"]);