function reverseInPlace(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let rightOne = arr[right];
        arr[right] = arr[left];

        arr[left] = rightOne;

        left++;
        right--;
    }
    console.log(arr.join(" "));
}

reverseInPlace(['a', 'b', 'c', 'd', 'e']);