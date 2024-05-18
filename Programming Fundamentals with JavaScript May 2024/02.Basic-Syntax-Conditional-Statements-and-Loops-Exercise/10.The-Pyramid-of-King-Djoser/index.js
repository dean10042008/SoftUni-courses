function thePyramidOfKingDjoser(base, increment) {
    let stone = 0;
    let marbles = 0;
    let lapisLazuli = 0;
    let gold = 0;
    let currentFloor = 1;
    let height = 1;

    for (let i = base; i >= 1; i-=2) {
        let parameter = (i * 4) - 4;
        let currentLayer = i;
        if (i === 1) {
            gold = i * increment;
        }
        else if (i === 2) {
            gold = (i * 2) * increment;
        }
        else if (currentFloor % 5 === 0) {
            currentLayer -= 2;
            stone += (currentLayer * currentLayer) * increment;
            lapisLazuli += parameter * increment;
        }
        else {
            currentLayer -= 2;
            stone += (currentLayer * currentLayer) * increment;
            marbles += parameter * increment;
        }

        currentFloor++;
    }

    height = (currentFloor - 1) * increment;

    console.log(`Stone required: ${Math.ceil(stone)}`);
    console.log(`Marble required: ${Math.ceil(marbles)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(lapisLazuli)}`);
    console.log(`Gold required: ${Math.ceil(gold)}`);
    console.log(`Final pyramid height: ${Math.floor(height)}`);
}

thePyramidOfKingDjoser(11, 1);