function spiceMustFlow(startingYield) {
    let days = 0;
    let currentYield = 0;

        while (startingYield >= 100) {
            currentYield += startingYield;

            if (currentYield >= 26) {
                currentYield -= 26;
            }

            days++;
            startingYield -= 10;

        }

        if (currentYield >= 26) {
            currentYield -= 26;
        }

    console.log(days);
    console.log(currentYield);
}

spiceMustFlow(111);