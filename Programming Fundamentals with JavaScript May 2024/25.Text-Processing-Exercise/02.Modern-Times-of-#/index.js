function modernTimes(text){
    const textArray = text.split(' ');
    const result = [];

    let hasOnlyLetters = true;

    textArray.forEach((item) => {
        if (item.includes("#") && item.length !== 1) {
            const word = item.split('#')[1];
            hasOnlyLetters = true;

            if (word.includes("0") || word.includes("1") || word.includes("2") || word.includes("3") || word.includes("4") || word.includes("5") || word.includes("6") || word.includes("7") || word.includes("8") || word.includes("9")) {
                hasOnlyLetters = false;
            }

            if (hasOnlyLetters) {
                result.push(word);
            }
        }
    })

    console.log(result.join('\n'));
}

modernTimes('Nowadays everyone uses # to tag a #special word in #socialMedia');