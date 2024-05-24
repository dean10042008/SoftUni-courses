function gladiatorExpenses(fightsLost, helmetPrice, swordPrice, shieldPrice, armorPrice) {
    let sum = 0;
    let brokenShields = 0;

    for (let i = 1; i <= fightsLost; i++) {
        if (i % 2 === 0) {
            sum += helmetPrice;
        }
        if (i % 3 === 0) {
            sum += swordPrice;
        }
        if (i % 2 === 0 && i % 3 === 0) {
            sum += shieldPrice;
            brokenShields++;
        }
        if (brokenShields % 2 === 0 && brokenShields !== 0) {
            sum += armorPrice;
            brokenShields = 0;
        }
    }
    console.log(`Gladiator expenses: ${sum.toFixed(2)} aureus`);
}

gladiatorExpenses(7, 2, 3, 4, 5);