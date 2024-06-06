function smallestOfThreeNumber(num1, num2, num3) {
    let arr = [num1, num2, num3];
    let smallest = num1;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < smallest) {
            smallest = arr[i];
        }
    }

    console.log(smallest);
}

smallestOfThreeNumber(2, 5, 3);