function bitcoinMining(array) {
    let bitcoinCount = 0;
    let firstBitcoinDay = 0;
    let totalMoney = 0;
    let currentDay = 1;

    for (let i = 0; i < array.length; i++) {
        let gold = array[i];

        if (currentDay % 3 === 0) {
            gold *= 0.7;
        }

        let moneyFromGold = gold * 67.51;

        totalMoney += moneyFromGold;

        while (totalMoney >= 11949.16) {
            if (bitcoinCount === 0) {
                firstBitcoinDay = currentDay;
            }

            bitcoinCount++;
            totalMoney -= 11949.16;
        }

        currentDay++;
    }

    console.log(`Bought bitcoins: ${bitcoinCount}`);
    if (bitcoinCount === 0) {

    }
    else {
        console.log(`Day of the first purchased bitcoin: ${firstBitcoinDay}`);
    }

    console.log(`Left money: ${totalMoney.toFixed(2)} lv.`);
}

bitcoinMining([100, 200, 300]);