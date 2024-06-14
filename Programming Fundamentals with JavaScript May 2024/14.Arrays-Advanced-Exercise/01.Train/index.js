function train(arr) {
    let inputTrainArr = arr[0].split(' ').map(Number);
    let maxCapacity = Number(arr[1]);

    let command = '';

    for (let i = 2; i < arr.length; i++) {
        command = arr[i].split(" ")

        let commandName = command[0];

        switch (commandName) {
            case "Add":
                inputTrainArr.push(Number(command[1]));
                break;
            case `${commandName}`:
                let numToAdd = Number(commandName);

                for (let j = 0; j < inputTrainArr.length; j++) {
                    let spaceHave = maxCapacity - inputTrainArr[j];
                    if (spaceHave >= numToAdd) {
                        inputTrainArr[j] += numToAdd;
                        break;
                    }
                }
        }
    }

    console.log(inputTrainArr.join(" "));
}

train(['32 54 21 12 4 0 23', '75', 'Add 10', 'Add 0', '30', '10', '75']);