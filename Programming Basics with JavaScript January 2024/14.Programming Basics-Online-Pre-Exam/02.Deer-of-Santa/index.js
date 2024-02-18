function deerOfSanta(input) {
    let daysAway = Number(input[0]);
    let foodLeft = Number(input[1]);
    let foodFirstDeer = Number(input[2]);
    let foodSecondDeer = Number(input[3]);
    let foodThirdDeer = Number(input[4]);

    let first = foodFirstDeer * daysAway;
    let second = foodSecondDeer * daysAway;
    let third = foodThirdDeer * daysAway;

    let total = first + second + third;

    if (foodLeft >= total) {
        console.log(`${Math.floor(foodLeft - total)} kilos of food left.`);
    }
    else {
        console.log(`${Math.ceil(total - foodLeft)} more kilos of food are needed.`);
    }
}

deerOfSanta(["2", "10", "1", "1", "2"]);