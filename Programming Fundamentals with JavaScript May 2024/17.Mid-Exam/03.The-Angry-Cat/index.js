function theAngryCat(arr, entryPoint, itemType) {
    let leftSum = 0;
    let rightSum = 0;

    let entryPointValue = arr[entryPoint];

    for (let i = 0; i < entryPoint; i++) {
        if (itemType === "cheap") {
            if (arr[i] < entryPointValue) {
                leftSum += arr[i];
            }
        }
        else if (itemType === "expensive") {
            if (arr[i] >= entryPointValue) {
                leftSum += arr[i];
            }
        }
    }

    for (let i = entryPoint + 1; i < arr.length; i++) {
        if (itemType === "cheap") {
            if (arr[i] < entryPointValue) {
                rightSum += arr[i];
            }
        }
        else if (itemType === "expensive") {
            if (arr[i] >= entryPointValue) {
                rightSum += arr[i];
            }
        }
    }

    if (leftSum >= rightSum) {
        console.log(`Left - ${leftSum}`);
    }
    else {
        console.log(`Right - ${rightSum}`);
    }
}

theAngryCat([1, 5, 1], 1, "cheap");