function theImitationGame(arr) {
    let mixedWord = arr.shift();

    while (arr[0] !== 'Decode') {
        const tokens = arr.shift().split("|");
        const command = tokens.shift();

        if (command === "Move") {
            const numberOfLetters = Number(tokens.shift());
            const letters = mixedWord.substring(0, numberOfLetters);
            mixedWord = mixedWord.substring(numberOfLetters).concat(letters);
        }
        else if (command === "Insert") {
            const index = Number(tokens.shift());
            const value = tokens.shift();

            const firstPart = mixedWord.substring(0, index);
            const secondPart = mixedWord.substring(index);

            mixedWord = `${firstPart}${value}${secondPart}`;
        }
        else if (command === "ChangeAll") {
            const substring = tokens.shift();
            const replacement = tokens.shift();

            mixedWord = mixedWord.split(substring).join(replacement);
        }
    }

    console.log(`The decrypted message is: ${mixedWord}`);
}

theImitationGame(['zzHe', 'ChangeAll|z|l', 'Insert|2|o', 'Move|3', 'Decode']);