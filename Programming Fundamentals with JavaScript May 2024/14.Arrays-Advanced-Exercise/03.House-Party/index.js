function houseParty(guests) {
    let firstNameStr = [guests[0]];

    let firstName = firstNameStr[0].split(" ");

    let result = [firstName[0]];

    for (let i = 1; i < guests.length; i++) {
        let commandsArray = guests[i].split(" ");

        let name = commandsArray[0];

        let command = `${commandsArray[1]} ${commandsArray[2]}`;

        switch (command) {
            case "is going!":
                for (let j = 0; j < result.length; j++) {
                    if (result.includes(name)) {
                        console.log(`${name} is already in the list!`);
                        break;
                    }
                    if (!result.includes(name)) {
                        result.push(name);
                        j++;
                        break;
                    }
                }
                break;


            case "is not": {
                for (let j = 0; j < result.length; j++) {
                    if (!result.includes(name)) {
                        console.log(`${name} is not in the list!`);
                        break;
                    }
                    if (result.includes(name)) {
                        let mid = result.splice(result.indexOf(name), 1);
                        j++;
                        break;
                    }
                }
                break;
            }
        }
    }

    console.log(result.join("\n"));
}

houseParty(['Allie is going!', 'George is going!', 'John is not going!', 'George is not going!']);