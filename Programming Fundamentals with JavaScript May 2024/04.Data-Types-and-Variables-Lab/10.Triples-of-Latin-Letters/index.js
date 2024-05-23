function triplesOfLatinLetters(lettersUsed) {
    for (let i = 0; i < lettersUsed; i++) {
        for (let j = 0; j < lettersUsed; j++) {
            for (let k = 0; k < lettersUsed; k++) {
                console.log(String.fromCharCode(97 + i) + String.fromCharCode(97 + j) + String.fromCharCode(97 + k));
            }
        }
    }
}

triplesOfLatinLetters(3);