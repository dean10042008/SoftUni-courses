function arrayManipulations(arr) {
    function add(array, number) {
        return array.push(number);
    }
    function remove(array, numberToRemove) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === numberToRemove) {
                array.splice(i, 1);
                i--;
            }
        }
    }
    function removeAtIndex(array, index) {
        array.splice(index, 1);
    }
    function insert(array, number, index) {
        array.splice(index, 0, number);
    }

    let inputArr = arr[0].split(' ').map(Number);

    for (let i = 1; i < arr.length; i++) {
        let commandsArr = arr[i].split(" ");
        let command = commandsArr[0];
        let value = Number(commandsArr[1]);

        switch (command) {
            case "Add":
                add(inputArr, value);
                break;
            case "Remove":
                remove(inputArr, value);
                break;
            case "RemoveAt":
                removeAtIndex(inputArr, value);
                break;
            case "Insert":
                let indexToInsert = commandsArr[2];
                insert(inputArr, value, indexToInsert);
                break;
        }
    }

    console.log(inputArr.join(" "));
}

arrayManipulations(['4 19 2 53 6 43', 'Add 3', 'Remove 2', 'RemoveAt 1', 'Insert 8 3']);