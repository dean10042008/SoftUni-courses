function reverseAnArrayOfNumbers(n, arr) {
    let result = [];
    for (let i = n - 1; i >= 0; i--) {
        let currentNum = arr[i];
        result.push(currentNum);
    }

    console.log(result.join(" "));
}

reverseAnArrayOfNumbers(3, [10, 20, 30, 40, 50]);