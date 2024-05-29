function condenseArrayToNumber(arr) {

    if (arr.length === 1) {
        console.log(arr[0]);
        return;
    }

    while (arr.length > 1) {
        let condensedArray = [];
        for (let i = 0; i < arr.length - 1; i++) {
            condensedArray.push(arr[i] + arr[i + 1]);
        }
        arr = condensedArray;
    }
    console.log(arr[0]);
}

condenseArrayToNumber([2, 10, 3]);