function negativeOrPositiveNumbers(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            result.unshift(arr[i]);
        }
        else {
            result.push(arr[i]);
        }
    }

    for (let number of result) {
        console.log(number)
    }
}

negativeOrPositiveNumbers(['7', '-2', '8', '9']);