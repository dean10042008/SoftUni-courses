function searchForANumber(arrToSearch, commandsArr) {
    let elementsToTake = commandsArr[0];
    let elementsToDelete = commandsArr[1];
    let searchItem = commandsArr[2];

    let count = 0;

    let arr2 = arrToSearch.slice(0, elementsToTake);

    for (let i = 0; i < elementsToDelete; i++) {
        arr2.shift();
    }

    for (let j = 0; j < arr2.length; j++) {
        if (arr2[j] === searchItem) {
            count++;
        }
    }

    console.log(`Number ${searchItem} occurs ${count} times.`);
}

searchForANumber([5, 2, 3, 4, 1, 6], [5, 2, 3]);