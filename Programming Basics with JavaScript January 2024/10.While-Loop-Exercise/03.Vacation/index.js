function holiday(input) {
    let moneyNeeded = Number(input[0]);
    let budget = Number(input[1]);

    let i = 2;
    let command = input[i]; // save or spend
    i++;

    let moneySpentOrSavedThatDay = Number(input[i]);
    i++;

    // let budgetAfter = 0;
    let daysGoneBy = 0;
    let spendInARow = 0;

    while (budget < moneyNeeded) {

        daysGoneBy++;

        if (command === 'save') {
            spendInARow = 0;
            budget += moneySpentOrSavedThatDay;
        }
        else {
            spendInARow++;
            if (moneySpentOrSavedThatDay >= budget) {
                budget = 0;
            }
            else {
                budget -= moneySpentOrSavedThatDay;
            }
        }

        if (spendInARow === 5) {
            console.log("You can't save the money.");
            break;
        }

        command = input[i];
        i++;

        moneySpentOrSavedThatDay = Number(input[i]);
        i++;

    }

    if (budget >= moneyNeeded) {
        console.log(`You saved the money for ${daysGoneBy} days.`);
    }
    else {
        console.log(daysGoneBy);
    }
}

holiday(["2000", "1000", "spend", "1200", "save", "2000"]);