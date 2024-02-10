function traveling(input) {
    let i = 0;
    let command = input[i];

    while (command !== "End") {
        let destination = command;
        i++;
        let budget = Number(input[i]);
        i++;
        let sum = 0;

        while (sum < budget) {
            let money = Number(input[i]);

            sum += money;

            i++;
        }

        if (sum >= budget) {
            console.log(`Going to ${destination}!`);
        }

        command = input[i];
    }
}

traveling(["Greece", "1000", "200", "200", "300", "100", "150", "240", "Spain", "1200", "300", "500", "193", "423", "End"]);