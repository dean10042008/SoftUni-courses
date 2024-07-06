function legendaryFarming(str) {
    const resources = str.split(' ');

    const key = {
        fragments: 0,
        shards: 0,
        motes: 0
    }

    const junk = {};

    for (let i = 0; i < resources.length; i += 2) {
        const quantity = Number(resources[i]);
        const material = resources[i + 1].toLowerCase();

        if (material in key || material in junk) {
            if (material === "fragments" || material === "shards" || material === "motes") {
                key[material] += quantity;
            }
            else {
                junk[material] += quantity;
            }
        }
        else {
            junk[material] = quantity;
        }

        if (key.fragments >= 250) {
            console.log("Valanyr obtained!");
            key.fragments -= 250;
            break;
        }
        else if (key.shards >= 250) {
            console.log("Shadowmourne obtained!");
            key.shards -= 250;
            break;
        }
        else if (key.motes >= 250) {
            console.log("Dragonwrath obtained!");
            key.motes -= 250;
            break;
        }
    }

    const keyEntries = Object.entries(key);
    keyEntries.sort(([keyA, valueA], [keyB, valueB]) => {
        return valueB - valueA || keyA.localeCompare(keyB);
    });

    const junkEntries = Object.entries(junk);
    junkEntries.sort(([keyA, valueA], [keyB, valueB]) => {
        return keyA.localeCompare(keyB);
    });

    keyEntries.forEach(combination => {
        console.log(`${combination[0]}: ${combination[1]}`);
    });

    junkEntries.forEach(combination => {
        console.log(`${combination[0]}: ${combination[1]}`);
    });
}

legendaryFarming('3 Motes 5 stones 5 Shards 6 leathers 255 fragments 7 Shards');