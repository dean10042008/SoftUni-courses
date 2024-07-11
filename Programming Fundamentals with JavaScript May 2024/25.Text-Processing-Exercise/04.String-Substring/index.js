function stringSubstring(word, sentence) {
    const textArr = sentence.split(" ");

    for (let w of textArr) {
        const lowercasedWord = w.toLowerCase();

        if (lowercasedWord === word) {
            console.log(word);
            return;
        }
    }

    console.log(`${word} not found!`);
}

stringSubstring('javascript', 'JavaScript is the best programming language');