function manOWar(arr) {
    let pirateShip = arr.shift().split(">").map(Number);
    let warship = arr.shift().split(">").map(Number);
    const maxHealth = Number(arr.shift());

    let i = 0;
    let commands = arr[i];
    i++;

    while (commands !== "Retire") {
        let tokens = commands.split(" ");
        const command = tokens[0];

        if (command === "Fire") {
            let index = Number(tokens[1]);
            let dmg = Number(tokens[2]);

            if (index >= 0 && index < warship.length) {
                warship[index] -= dmg;

                if (warship[index] <= 0) {
                    console.log("You won! The enemy ship has sunken.");
                    return;
                }
            }
        }
        else if (command === "Defend") {
            const startIndex = Number(tokens[1]);
            const endIndex = Number(tokens[2]);
            let dmg = Number(tokens[3]);

            if (startIndex >= 0 && endIndex < pirateShip.length) {

                for (let j = startIndex; j <= endIndex; j++) {
                    pirateShip[j] -= dmg;

                    if (pirateShip[j] <= 0) {
                        console.log(`You lost! The pirate ship has sunken.`);
                        return;
                    }
                }
            }
        }
        else if (command === "Repair") {
            const index = Number(tokens[1]);
            let health = Number(tokens[2]);

            if (index >= 0 && index < pirateShip.length) {
                if (pirateShip[index] + health >= maxHealth) {
                    pirateShip[index] = maxHealth;
                }
                else {
                    pirateShip[index] += health;
                }
            }
        }
        else if (command === "Status") {
            const needRepair = maxHealth * 0.2;
            let count = 0;

            for (let section of pirateShip) {
                if (section < needRepair) {
                    count++;
                }
            }

            console.log(`${count} sections need repair.`);
        }

        commands = arr[i];
        i++;
    }

    let sumPirateShip = 0;
    for (let section of pirateShip) {
        sumPirateShip += section;
    }

    let sumWarship = 0;
    for (let section of warship) {
        sumWarship += section;
    }

    console.log(`Pirate ship status: ${sumPirateShip}`);
    console.log(`Warship status: ${sumWarship}`);
}

manOWar(["12>13>11>20>66", "12>22>33>44>55>32>18", "70", "Fire 2 11", "Fire 8 100", "Defend 3 6 11", "Defend 0 3 5", "Repair 1 33", "Status", "Retire"]);