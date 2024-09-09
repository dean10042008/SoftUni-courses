function aggregateElements(arr) {
    let numRes = 0;
    let inverseRes = 0;
    let stringRes = '';

    for (let i = 0; i < arr.length; i++) {
        numRes += arr[i];

        inverseRes += 1 / arr[i];

        stringRes += String(arr[i]);
    }

    console.log(numRes);
    console.log(inverseRes);
    console.log(stringRes);
}

aggregateElements([1, 2, 3]);