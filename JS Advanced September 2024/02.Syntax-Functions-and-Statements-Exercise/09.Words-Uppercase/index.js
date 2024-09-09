function wordsUppercase(str) {
    const regex = /\w+/g;

    let uppercased = [];
    let words = str.match(regex);

    for (const word of words) {
        uppercased.push(word.toUpperCase());
    }

    console.log(uppercased.join(', '));
}

wordsUppercase('Hi, how are you?');