function firstAndLastKNumbers(arr) {
    let numberOfNums = arr[0];

    let firstPart = arr.slice(1, 1 + numberOfNums);
    let lastPart = arr.slice(arr.length - numberOfNums);

    console.log(firstPart.join(" "));
    console.log(lastPart.join(" "));
}

firstAndLastKNumbers([2, 7, 8, 9]);