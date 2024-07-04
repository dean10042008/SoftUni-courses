function partyTime(arr) {
    let command = arr.shift();

    const VIPGuests = [];
    const regularGuests = [];
    let guestsCount = 0;

    while (command !== "PARTY") {
        const firstSymbol = command[0];
        if (firstSymbol.charCodeAt(0) >= 48 && firstSymbol.charCodeAt(0) <= 57) {
            VIPGuests.push(command);
        }
        else {
            regularGuests.push(command);
        }

        command = arr.shift();
    }

    for (const guest of arr) {
        const firstSymbol = guest[0];
        if (firstSymbol.charCodeAt(0) >= 48 && firstSymbol.charCodeAt(0) <= 57) {
            const index = VIPGuests.indexOf(guest);
            if (index !== -1) {
                VIPGuests.splice(index, 1);
            }
        }
        else {
            const index = regularGuests.indexOf(guest);
            if (index !== -1) {
                regularGuests.splice(index, 1);
            }
        }
    }

    guestsCount = VIPGuests.length + regularGuests.length;

    console.log(guestsCount);

    VIPGuests.forEach(guest => {
        console.log(guest);
    })

    regularGuests.forEach(guest => {
        console.log(guest);
    })
}

partyTime(['7IK9Yo0h', '9NoBUajQ', 'Ce8vwPmE', 'SVQXQCbc', 'tSzE5t0p', 'PARTY', '9NoBUajQ', 'Ce8vwPmE', 'SVQXQCbc']);