function dungeonestDark(arr) {
    let health = 100;
    let coins = 0;
    let rooms = arr[0].split("|");
    let bestRoom = 0;

    for (let i = 0; i < rooms.length; i++) {
        bestRoom++;
        let [item, number] = rooms[i].split(" ");
        number = Number(number);

        if (item === "potion") {
            if ((health + number) >= 100) {
                console.log(`You healed for ${100 - health} hp.`)
                health = 100;
            }
            else {
                console.log(`You healed for ${number} hp.`);
                health += number;
            }
            console.log(`Current health: ${health} hp.`);
        }
        else if (item === "chest") {
            coins += number;
            console.log(`You found ${number} coins.`);
        }
        else {
            health -= number;

            if (health > 0) {
                console.log(`You slayed ${item}.`);
            }
            else {
                console.log(`You died! Killed by ${item}.`);
                console.log(`Best room: ${bestRoom}`);
                return;
            }
        }
    }

    console.log("You've made it!");
    console.log(`Coins: ${coins}`);
    console.log(`Health: ${health}`);
}

dungeonestDark(["rat 10|bat 20|potion 10|rat 10|chest 100|boss 70|chest 1000"]);