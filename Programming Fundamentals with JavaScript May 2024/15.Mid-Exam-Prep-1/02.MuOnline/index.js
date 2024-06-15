function muOnline(input) {
    let hp = 100;
    let bitcoin = 0;

    let commands = input.split("|");

    for (let i = 0; i < commands.length; i++) {
        const tokens = commands[i].split(" ");
        let command = tokens[0];
        let number = Number(tokens[1]);

        if (command === "potion") {
            if (hp + number >= 100) {
                console.log(`You healed for ${100 - hp} hp.`);
                hp = 100;
            }
            else {
                hp += number;
                console.log(`You healed for ${number} hp.`);
            }

            console.log(`Current health: ${hp} hp.`)
        }
        else if (command === "chest") {
            bitcoin += number;
            console.log(`You found ${number} bitcoins.`)
        }
        else {
            hp -= number;

            if (hp <= 0) {
                console.log(`You died! Killed by ${command}.`);
                console.log(`Best room: ${i + 1}`);
                return;
            }
            else {
                console.log(`You slayed ${command}.`);
            }
        }
    }

    console.log(`You've made it!`);
    console.log(`Bitcoins: ${bitcoin}`);
    console.log(`Health: ${hp}`);
}

// muOnline("rat 10|bat 20|potion 10|rat 10|chest 100|boss 70|chest 1000");
muOnline("cat 10|potion 30|orc 10|chest 10|snake 25|chest 110");