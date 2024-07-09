function countStringOccurrences(text, searchedWord) {
    const arr = text.split(" ");
    let count = 0;

    for (const word of arr) {
        if (searchedWord === word) {
            count++;
        }
    }

    console.log(count);
}

countStringOccurrences('This is a word and it also is a sentence', 'is');