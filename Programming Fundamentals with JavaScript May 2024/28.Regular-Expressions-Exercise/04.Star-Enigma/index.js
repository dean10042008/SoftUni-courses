function starEnigma(arr) {
    const commandCount = Number(arr.shift());
    const captureKeyPattern = /[star]|[STAR]/;
    const regex = /[^@\-!:>]*@(?<planetName>[A-Z][a-z]+)[^@\-!:>]*:[^\d@\-!:>]*(?<planetPopulation>\d+)[^@\-!:>]*\!(?<attackType>[A|D])\![^@\-!:>]*->[^\d@\-!:>]*(?<soldierCount>\d+)[^@\-!:>]*/;

    const attacked = [];
    const destroyed = [];

    for (let i = 0; i < commandCount; i++) {
        const command = arr[i].split('');
        let decryptionKeyCount = 0;

        command.forEach((item) => {
            if (captureKeyPattern.test(item)) {
                decryptionKeyCount++
            }
        })

        for (let j = 0; j < command.length; j++) {
            const asciiValue = command[j].charCodeAt(0);
            const newValue = asciiValue - decryptionKeyCount;

            command[j] = String.fromCharCode(newValue);
        }

        const decryptedMessage = command.join("");

        const match = decryptedMessage.match(regex);

        if (match) {
            const name = match.groups.planetName;
            // const planetPopulation = match.groups.planetPopulation;
            const attackType = match.groups.attackType;
            // const soldierCount = match.groups.soldierCount;

            if (attackType === "A") {
                attacked.push(name);
            }
            else if (attackType === "D") {
                destroyed.push(name);
            }
        }
    }

    attacked.sort((a, b) => a.localeCompare(b));
    destroyed.sort((a, b) => a.localeCompare(b));

    console.log(`Attacked planets: ${attacked.length}`);
    attacked.forEach((item) => {
        console.log(`-> ${item}`);
    })

    console.log(`Destroyed planets: ${destroyed.length}`);
    destroyed.forEach((item) => {
        console.log(`-> ${item}`);
    })

}

starEnigma(['2', 'STCDoghudd4=63333$D$0A53333', 'EHfsytsnhf?8555&I&2C9555SR']);