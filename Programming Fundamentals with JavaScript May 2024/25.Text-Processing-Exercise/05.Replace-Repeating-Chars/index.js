function replaceRepeatingChars(str) {
    let result = '';

    for (let i = 0; i < str.length; i++) {
        let currentChar = str[i];
        let previousChar = str[i - 1];

        if (currentChar !== previousChar) {
            result += str[i];
        }
    }

    console.log(result);
}

replaceRepeatingChars('aaaaabbbbbcdddeeeedssaa');