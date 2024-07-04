function wordTracker(arr) {
    const wordsToLook = arr.shift().split(" ");
    let result = {};

    wordsToLook.forEach(word => {
        result[word] = 0;
    })

    for (const word of arr) {
        if (result.hasOwnProperty(word)) {
            result[word]++;
        }
    }

    let entries = Object.entries(result);

    entries.sort(([keyA, valueA], [keyB, valueB]) => valueB - valueA);
    entries.forEach(combination => {
        console.log(`${combination[0]} - ${combination[1]}`);
    })
}

wordTracker(['this sentence', 'In', 'this', 'sentence', 'you', 'have', 'to', 'count', 'the', 'occurrences', 'of', 'the', 'words', 'this', 'and', 'sentence', 'because', 'this', 'is', 'your', 'task']);