function charactersInRange(start, end) {
    let startChar = start.charCodeAt(0);
    let endChar = end.charCodeAt(0);
    let result = [];

    if (startChar < endChar) {
        for (let i = startChar + 1; i < endChar; i++) {
            result.push(String.fromCharCode(i));
        }
    }
    else {
        let middle = startChar;
        startChar = endChar;
        endChar = middle;
        for (let j = startChar + 1; j < endChar; j++) {
            result.push(String.fromCharCode(j));
        }
    }

    console.log(result.join(" "));
}

charactersInRange('a', 'd');