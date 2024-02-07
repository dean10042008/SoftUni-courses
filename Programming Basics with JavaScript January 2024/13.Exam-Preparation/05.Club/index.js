function club(input) {
    let target = Number(input[0]);

    let i = 1;
    let command = input[i];
    i++;
    
    let priceForOne = Number(input[i]);
    i++;

    let priceForAll = 0;
    let sum = 0;

    while (command !== "Party!") {
        priceForAll = priceForOne * command.length;

        if (priceForAll % 2 !== 0) {
            priceForAll *= 0.75;
        }

        sum += priceForAll;

        if (sum >= target) {
            console.log("Target acquired.");
            console.log(`Club income - ${sum.toFixed(2)} leva.`);
            return;
        }

        command = input[i];
        i++;

        priceForOne = Number(input[i]);
        i++;
    }

    if (command === "Party!") {
        console.log(`We need ${(Math.abs(target - sum)).toFixed(2)} leva more.`);
        console.log(`Club income - ${sum.toFixed(2)} leva.`);
    }
}

club(["500", "Bellini", "6", "Bamboo", "7", "Party!"]);