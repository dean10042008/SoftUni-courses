function arrayRotation(arr, rotationCount) {

    for (let i = 1; i <= rotationCount; i++) {
        arr.push(arr[0]);
        arr.shift();
    }
    console.log(arr.join(" "));
}

arrayRotation([51, 47, 32, 61, 21], 2);