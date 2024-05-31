function maxSequenceOfEqualElements(arr) {
    if (arr.length === 0) {
        console.log('');
        return;
    }

    let maxSequence = arr[0];
    let currentSequence = arr[0];
    let maxCount = 1;
    let currentCount = 1;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) {
            currentCount++;
        } else {
            if (currentCount > maxCount) {
                maxCount = currentCount;
                maxSequence = arr[i - 1];
            }
            currentCount = 1;
        }
    }

    if (currentCount > maxCount) {
        maxCount = currentCount;
        maxSequence = arr[arr.length - 1];
    }

    console.log(Array(maxCount).fill(maxSequence).join(' '));
}

maxSequenceOfEqualElements([2, 1, 1, 2, 3, 3, 2, 2, 2, 1]);