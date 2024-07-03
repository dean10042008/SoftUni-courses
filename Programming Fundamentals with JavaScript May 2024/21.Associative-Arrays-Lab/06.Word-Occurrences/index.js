function wordOccurrences(arr) {
    let result = {};
    for (const word of arr) {
        if (result.hasOwnProperty(word)) {
            result[word]++;
        }
        else {
            result[word] = 1;
        }
    }

    let entries = Object.entries(result);

    entries.sort(([keyA, valueA], [keyB, valueB]) => {
        return valueB - valueA;
    })

    for (const entry of entries) {
        console.log(`${entry[0]} -> ${entry[1]} times`);
    }
}

wordOccurrences(["Here", "is", "the", "first", "sentence", "Here", "is", "another", "sentence", "And", "finally", "the", "third", "sentence"]);