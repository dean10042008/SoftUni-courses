function excursionSale(input) {
    let sea = Number(input[0]);
    let mountain = Number(input[1]);

    let profit = 0;

    let i = 2;
    let command = input[i];
    i++;

    while (command !== "Stop") {
        if (command === "sea") {
            if (sea === 0) {
                command = input[i];
                i++;
                continue;
            }
            profit += 680;
            sea--;
        }
        else {
            if (mountain === 0) {
                command = input[i];
                i++;
                continue;
            }
            profit += 499;
            mountain--;
        }
        if (sea === 0 && mountain === 0) {
            console.log("Good job! Everything is sold.");
            console.log(`Profit: ${profit} leva.`);
            return;
        }

        command = input[i];
        i++;
    }
    if (command === "Stop") {
        console.log(`Profit: ${profit} leva.`);
    }
}

excursionSale(["2", "2", "sea", "mountain", "sea", "sea", "mountain"]);