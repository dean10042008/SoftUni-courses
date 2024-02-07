function travel(input) {
    let city = input[0];
    let typeRest = input[1];
    let isVip = input[2];
    let days = Number(input[3]);

    let total = 0;

    if (days < 1) {
        console.log("Days must be positive number!");
        return;
    }
    else if ((city !== "Bansko" && city !== "Borovets" && city !== "Varna" && city !== "Burgas") || (typeRest !== "noEquipment" && typeRest !== "withEquipment" && typeRest !== "noBreakfast" && typeRest !== "withBreakfast")) {
        console.log("Invalid input!");
        return;
    }

    if (days > 7) {
        days -= 1;
    }

    if (city === "Bansko" || city === "Borovets") {
        if (typeRest === "withEquipment") {
            total = days * 100;

            if (isVip === "yes") {
                total *= 0.9;
            }
        }
        else if (typeRest === "noEquipment") {
            total = days * 80;

            if (isVip === "yes") {
                total *= 0.95;
            }
        }
    }
    else if (city === "Varna" || city === "Burgas") {
        if (typeRest === "withBreakfast") {
            total = days * 130;

            if (isVip === "yes") {
                total *= 0.88;
            }
        }
        else if (typeRest === "noBreakfast") {
            total = days * 100;

            if (isVip === "yes") {
                total *= 0.93;
            }
        } 
    }

    console.log(`The price is ${total.toFixed(2)}lv! Have a nice time!`);
}

travel(["Borovets", "noEquipment", "yes", "6"]);