function armies(arr) {
    const result = {};

    for (const command of arr) {
        const tokens = command.split(": ");
        const tokens2 = command.split(" + ");

        if (command.includes("arrives")) {
            const leader = command.split(" arrives")[0];

            result[leader] = {}
        }
        else if (tokens[1] !== undefined) {
            const leader = tokens.shift();
            const [armyName, armyCount] = tokens[0].split(", ");

            if (leader in result) {
                result[leader][armyName] = armyCount;
            }
        }
        else if (tokens2[1] !== undefined) {
            const [army, count] = tokens2;

            for (const resultKey in result) {
                if (result[resultKey][army]) {
                    const old = Number(result[resultKey][army]);

                    result[resultKey][army] = old + Number(count);
                }
            }
        }
        else if (command.includes("defeated")) {
            const leaderToEliminate = command.split(" defeated")[0];

            if (leaderToEliminate in result) {
                delete result[leaderToEliminate];
            }
        }
    }

    for (const resultKey in result) {
        let sum = 0;

        for (const combo in result[resultKey]) {
            sum += Number(result[resultKey][combo]);
        }

        result[resultKey].sum = sum;
    }

    const entries = Object.entries(result);
    entries.sort((a, b) => {
        return b[1].sum - a[1].sum;
    });

    let i = 0;

    entries.forEach(([key, value]) => {
        const secondEntries = Object.entries(value);
        const sum = secondEntries.splice(-1);

        secondEntries.sort((a, b) => {
            return Number(b[1]) - Number(a[1]);
        })

        secondEntries.push(sum);

        entries[i] = [key, secondEntries];
        i++;
    })

    for (const entry of entries) {
        console.log(`${entry[0]}: ${entry[1][entry[1].length - 1][0][1]}`);

        entry[1].splice(-1);

        entry[1].forEach((element) => {
            console.log(`>>> ${element[0]} - ${element[1]}`);
        })
    }
}

armies(['Rick Burr arrives', 'Fergus: Wexamp, 30245', 'Rick Burr: Juard, 50000', 'Findlay arrives', 'Findlay: Britox, 34540', 'Wexamp + 6000', 'Juard + 1350', 'Britox + 4500', 'Porter arrives', 'Porter: Legion, 55000', 'Legion + 302', 'Rick Burr defeated', 'Porter: Retix, 3205']);