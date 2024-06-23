function spaceTravel(arr) {
    let tokens = arr.shift().split("||");
    let fuel = Number(arr.shift());
    let ammunition = Number(arr.shift());

    for (let token of tokens) {
        let command  = token.split(" ");
        let action = command[0];

        if (action === "Travel") {
            let lightYears = Number(command[1]);

            if (fuel >= lightYears) {
                fuel -= lightYears;
                console.log(`The spaceship travelled ${lightYears} light-years.`);
            }
            else {
                console.log("Mission failed.");
                return;
            }
        }
        else if (action === "Enemy") {
            let armour = Number(command[1]);
            let fuelNeeded = armour * 2;

            if (ammunition >= armour) {
                ammunition -= armour;
                console.log(`An enemy with ${armour} armour is defeated.`);
            }
            else if (fuel >= fuelNeeded) {
                fuel -= fuelNeeded;
                console.log(`An enemy with ${armour} armour is outmaneuvered.`);
            }
            else {
                console.log("Mission failed.");
                return;
            }
        }
        else if (action === "Repair") {
            let fuelAdd = Number(command[1]);
            let ammunitionAdd = Number(command[1]) * 2;

            fuel += fuelAdd;
            ammunition += ammunitionAdd;

            console.log(`Ammunitions added: ${ammunitionAdd}.`);
            console.log(`Fuel added: ${fuelAdd}.`);
        }
        else {
            console.log("You have reached Titan, all passengers are safe.");
            return;
        }
    }
}

spaceTravel([ 'Travel 10||Enemy 30||Repair 15||Titan', '50', '80' ]);