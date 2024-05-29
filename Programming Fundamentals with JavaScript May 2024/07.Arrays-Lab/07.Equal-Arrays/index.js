function equalArray(arr, arr2) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr2[i]) {
            sum += Number(arr[i]);
        }
        else {
            console.log(`Arrays are not identical. Found difference at ${i} index`);
            return;
        }
    }

    console.log(`Arrays are identical. Sum: ${sum}`);
}

equalArray(['10','20','30'], ['10','20','30']);