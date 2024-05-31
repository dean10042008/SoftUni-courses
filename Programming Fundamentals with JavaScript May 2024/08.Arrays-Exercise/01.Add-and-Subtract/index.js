function addAndSubtract(arr) {
    let sumOld = 0;
    let sumNew = 0;

    for (let i = 0; i < arr.length; i++) {
        sumOld += arr[i];
        if (arr[i] % 2 === 0) {
            arr[i] = arr[i] + i;
        }
        else {
            arr[i] = arr[i] - i;
        }
        sumNew += arr[i];
    }

    console.log(arr);
    console.log(sumOld);
    console.log(sumNew);
}

addAndSubtract([5, 15, 23, 56, 35]);