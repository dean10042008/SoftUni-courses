function revealWords(wordsStr, text) {
    const wordArray = wordsStr.split(', ');

    for (const word of wordArray) {
        const wordLength = word.length;

        text = text.replace("*".repeat(wordLength), word);
    }

    console.log(text);
}

revealWords('great', 'softuni is ***** place for learning new programming languages');