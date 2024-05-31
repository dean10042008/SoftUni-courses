function maxNumber(arr) {
    let result = [];
    let isTrue = true;
    for (let i = 0; i < arr.length - 1; i++) {
        isTrue = true;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] <= arr[j]) {
                isTrue = false;
                break;
            }
        }
        if (isTrue) {
            result.push(arr[i]);
        }
    }

    result.push(arr[arr.length - 1]);
    console.log(result.join(" "));
}

maxNumber([1, 4, 3, 2]);